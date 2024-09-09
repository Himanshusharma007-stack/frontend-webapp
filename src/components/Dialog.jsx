import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Switch,
} from "@material-tailwind/react";
import localStorageFunctions from "../utils/localStorageFunctions.js";
import {
  createFoodItem,
  getCategories,
  updateFoodItem,
} from "../services/FoodItems.js";
import { Pencil } from "lucide-react";
import Select from "react-select";

export function DialogBox(props) {
  const [open, setOpen] = React.useState(false);
  const [formData, setFormData] = React.useState({
    name: "",
    description: "",
    size: null,
    category: null,
    isVeg: true,
    inStock: true,
    image: null,
  });
  const [errors, setErrors] = React.useState({});
  const [categoryData, setCategoryData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  const getCategoryData = React.useCallback(async () => {
    try {
      if (!categoryData.length) {
        let { data } = await getCategories();
        setCategoryData(data);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }, [categoryData.length]);

  const sizeOptions = [
    { value: "small-7'", label: "Small 7'" },
    { value: "medium-10'", label: "Medium 10'" },
    { value: "large-12'", label: "Large 12'" },
  ];

  const handleSizeChange = (selectedOptions) => {
    const sizes = selectedOptions
      ? selectedOptions.map((option) => ({
          label: option.label,
          value: option.value,
          price: 0,
        }))
      : [];
    setFormData((prevState) => ({
      ...prevState,
      size: sizes,
    }));
  };

  const handlePriceChange = (index, newPrice) => {
    const updatedSizes = formData.size.map((item, i) => {
      if (i === index) {
        return { ...item, price: newPrice };
      }
      return item;
    });
    setFormData((prevState) => ({
      ...prevState,
      size: updatedSizes,
    }));
  };

  const handleOpen = () => setOpen(!open);

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.description)
      newErrors.description = "Description is required";
    if (!formData.category) newErrors.category = "Category is required";
    if (!formData.size || formData.size.length === 0)
      newErrors.size = "Size is required";
    return newErrors;
  };

  async function addOrUpdateBtnClicked() {
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    let data = localStorageFunctions.getDatafromLocalstorage("data");
    if (data.password) {
      delete data.password;
    }
    let obj = {
      ...formData,
      restaurant: data,
    };

    const formDataToSend = new FormData();
    for (const key in obj) {
      if (
        typeof obj[key] === "object" &&
        obj[key] !== null &&
        key !== "image"
      ) {
        formDataToSend.append(key, JSON.stringify(obj[key]));
      } else {
        formDataToSend.append(key, obj[key]);
      }
    }

    try {
      setIsLoading(true);
      let res;
      if (props.data) {
        formDataToSend.append("_id", props.data._id);
        res = await updateFoodItem(formDataToSend);
      } else {
        res = await createFoodItem(formDataToSend);
      }
      if (res.success) {
        setOpen(false);
        props.getMenuByRestoId();
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  }

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: files[0],
      }));
    } else if (name === "category") {
      const selectedCategory = categoryData.find(
        (category) => category._id === value
      );
      setFormData((prevData) => ({
        ...prevData,
        category: selectedCategory,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
    if (errors[name]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: null,
      }));
    }
  };

  const handleSwitchChange = (name) => (e) => {
    const { checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: checked,
    }));
  };

  React.useEffect(() => {
    if (open) {
      setFormData({
        name: props.data?.name || "",
        description: props.data?.description || "",
        size: props.data?.size || null,
        category: props.data?.category || null,
        isVeg: props.data?.isVeg ?? true,
        inStock: props.data?.inStock ?? true,
        image: null,
      });
      getCategoryData();
    } else {
      setFormData({
        name: "",
        description: "",
        size: null,
        category: null,
        isVeg: true,
        inStock: true,
        image: null,
      });
    }
  }, [open, props.data, getCategoryData]);

  return (
    <>
      {props?.data ? (
        <Pencil className="h-4" onClick={handleOpen} />
      ) : (
        <Button
          onClick={handleOpen}
          variant="gradient"
          disabled={props.isLoading}
        >
          + Add Item
        </Button>
      )}

      <Dialog open={open}>
        <DialogHeader>
          {props?.data ? <span>Edit Item</span> : <span>Add Item</span>}
        </DialogHeader>
        <DialogBody>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {["name", "description"].map((field) => (
              <div key={field}>
                <Input
                  label={field.charAt(0).toUpperCase() + field.slice(1)}
                  size="lg"
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  error={!!errors[field]}
                />
                {errors[field] && (
                  <p className="text-red-500 text-xs mt-1">{errors[field]}</p>
                )}
              </div>
            ))}

            <div className="relative">
              <select
                className="peer h-full w-full rounded border border-blue-gray-200 bg-transparent px-3 py-2.5 text-sm text-blue-gray-700 outline-none transition-all focus:border-2 focus:border-gray-900 "
                value={formData.category?._id || ""}
                onChange={handleChange}
                name="category"
              >
                <option value="" disabled>
                  Select Category
                </option>
                {categoryData.map((category) => (
                  <option value={category._id} key={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-x-8 mt-2">
              <input
                type="file"
                name="image"
                onChange={handleChange}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
              />
            </div>

            <div className="relative">
              <Select
                isMulti
                closeMenuOnSelect={false}
                options={sizeOptions}
                value={sizeOptions.filter((option) =>
                  formData.size?.some(
                    (selected) => selected.value === option.value
                  )
                )}
                onChange={handleSizeChange}
                className="react-select-container"
                placeholder="Select Size"
                classNamePrefix="react-select"
              />
            </div>

            {[
              { name: "isVeg", label: "Is Veg" },
              { name: "inStock", label: "In Stock" },
            ].map((switchField) => (
              <div key={switchField.name} className="space-x-8 mt-2">
                <Switch
                  checked={formData[switchField.name]}
                  name={switchField.name}
                  label={switchField.label}
                  onChange={handleSwitchChange(switchField.name)}
                  ripple={true}
                  className="checked:bg-[#2ec946] bg-deep-orange-900"
                />
              </div>
            ))}

            {formData.size?.map((item, index) => (
              <div key={index}>
                <Input
                  type="number"
                  name="price"
                  label={`Price for ${item.label}`}
                  value={item.price}
                  onChange={(e) => handlePriceChange(index, e.target.value)}
                />
              </div>
            ))}
          </div>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            Cancel
          </Button>
          <Button
            variant="gradient"
            color="green"
            disabled={isLoading}
            onClick={addOrUpdateBtnClicked}
          >
            {isLoading ? "Saving..." : "Save"}
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
