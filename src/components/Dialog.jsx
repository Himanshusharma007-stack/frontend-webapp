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

export function DialogBox(props) {
  const [open, setOpen] = React.useState(false);
  const [formData, setFormData] = React.useState({
    name: "",
    description: "",
    price: "",
    size: null,
    category: null,
    isVeg: true,
    inStock: true,
    image: null, // Add image to formData state
  });
  const [errors, setErrors] = React.useState({});
  const [categoryData, setCategoryData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  const getCategoryData = React.useCallback(async () => {
    try {
      if (!categoryData.length) {
        let { data } = await getCategories();
        console.log("getCategoryData ======> ", data);
        setCategoryData(data);
      }
    } catch (error) {
      console.error("Error -------> ", error);
      throw new Error(error);
    }
  }, []);

  const handleOpen = () => setOpen(!open);

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.description) newErrors.description = "Description is required";
    if (!formData.price) newErrors.price = "Price is required";
    else if (isNaN(formData.price)) newErrors.price = "Price must be a number";
    return newErrors;
  };

  async function addOrUpdateBtnClicked() {
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
  
    let data = localStorageFunctions.getDatafromLocalstorage("data");
    let obj = {
      ...formData,
      restaurant: data, // No need to spread data here
    };
  
    // Create a FormData object to send file data
    const formDataToSend = new FormData();
    for (const key in obj) {
      if (typeof obj[key] === 'object' && obj[key] !== null && key !== 'image') {
        formDataToSend.append(key, JSON.stringify(obj[key]));
      } else {
        formDataToSend.append(key, obj[key]);
      }
    }
  
    // if (formData.image) {
    //   formDataToSend.append("image", formData.image);
    // }
  
    try {
      setIsLoading(true);
      let res;
      if (props.data) {
        formDataToSend.append('_id', props.data._id);
        res = await updateFoodItem(formDataToSend); // Update to send FormData
      } else {
        res = await createFoodItem(formDataToSend); // Update to send FormData
      }
      if (res.success) {
        setOpen(false); // Close the dialog on successful submission
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
        [name]: files[0], // Store the file in formData
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
        price: props.data?.price || "",
        size: props.data?.size || null,
        category: props.data?.category || null,
        isVeg: props.data?.isVeg ?? true,
        inStock: props.data?.inStock ?? true,
        image: null, // Reset the image field when opening the dialog
      });
      getCategoryData()
    } else {
      setFormData({
        name: "",
        description: "",
        price: "",
        size: null,
        category: null,
        isVeg: true,
        inStock: true,
        image: null, // Reset the image field when closing the dialog
      });
    }
  }, [open, props.data]);

  return (
    <>
      {props?.data ? (
        <Pencil className="h-4" onClick={handleOpen} />
      ) : (
        <Button onClick={handleOpen} variant="gradient" disabled={props.isLoading}>
          + Add Item
        </Button>
      )}

      <Dialog open={open}>
        <DialogHeader>
          {props?.data ? <span>Edit Item</span> : <span>Add Item</span>}
        </DialogHeader>
        <DialogBody>
          <div className="grid grid-cols-2 gap-3">
            {["name", "description", "price"].map((field) => (
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
            <div className="relative min-w-[200px]">
              <select
                className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 empty:!bg-gray-900 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                value={formData.size || ""}
                onChange={handleChange}
                name="size"
              >
                <option value="" disabled>
                  Select Size
                </option>
                <option value="small-7'">Small 7'</option>
                <option value="medium-10'">Medium 10'</option>
                <option value="large-12'">Large 12'</option>
              </select>
              <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex max-h-[4px] w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                Select Size
              </label>
            </div>

            <div className="relative min-w-[200px]">
              <select
                className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 empty:!bg-gray-900 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
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
              <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex max-h-[4px] w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                Category
              </label>
            </div>

            <div className="space-x-8 mt-2">
              {/* <label className="block text-sm font-medium text-gray-700">
                Upload Image
              </label> */}
              <input
                type="file"
                name="image"
                onChange={handleChange}
                className="block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-violet-50 file:text-violet-700
                hover:file:bg-violet-100"
              />
            </div>

            {[
              { name: "isVeg", label: "Is Veg", bgClass: "checked:bg-[#2ec946] bg-deep-orange-900" },
              { name: "inStock", label: "In Stock" },
            ].map((switchField) => (
              <div key={switchField.name} className="space-x-8 mt-2">
                <Switch
                  checked={formData[switchField.name]}
                  name={switchField.name}
                  label={switchField.label}
                  onChange={handleSwitchChange(switchField.name)}
                  ripple={true}
                  className={switchField.bgClass}
                />
              </div>
            ))}
          </div>
        </DialogBody>
        <DialogFooter>
          <Button variant="text" color="red" onClick={handleOpen} className="mr-1">
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="blue" onClick={addOrUpdateBtnClicked} loading={isLoading}>
            <span>{props?.data ? "Update" : "Add"}</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}