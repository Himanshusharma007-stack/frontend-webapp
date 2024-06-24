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

export function DialogBox() {
  const [open, setOpen] = React.useState(false);
  const [formData, setFormData] = React.useState({
    name: "",
    description: "",
    price: "",
    size: "small-7'",
    vegetarian: true,
    inStock: true,
  });

  const handleOpen = () => setOpen(!open);

  function addBtnClicked() {
    console.log('formData -------------- ',formData);
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSwitchChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: checked,
    }));
  };

  return (
    <>
      <Button onClick={handleOpen} variant="gradient">
        + Add Item
      </Button>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>Add Item</DialogHeader>
        <DialogBody>
          <div className="grid grid-cols-2 gap-3">
            {["name", "description", "price"].map((field) => (
              <Input
                key={field}
                label={field.charAt(0).toUpperCase() + field.slice(1)}
                size="lg"
                name={field}
                value={formData[field]}
                onChange={handleChange}
              />
            ))}
            <div className="relative min-w-[200px]">
              <select
                className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 empty:!bg-gray-900 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                value={formData.size}
                onChange={handleChange}
                name="size"
              >
                <option value="small-7'">Small 7'</option>
                <option value="medium-10'">Medium 10'</option>
                <option value="large-12'">Large 12'</option>
              </select>
              <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                Select Size
              </label>
            </div>
            {[
              { name: "vegetarian", label: "Vegetarian", bgClass: "checked:bg-[#2ec946] bg-deep-orange-900" },
              { name: "inStock", label: "In stock" },
            ].map((switchField) => (
              <div key={switchField.name} className="space-x-8 mt-2">
                <Switch
                  checked={formData[switchField.name]}
                  name={switchField.name}
                  label={switchField.label}
                  onChange={handleSwitchChange}
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
          <Button variant="gradient" color="blue" onClick={addBtnClicked}>
            <span>Add</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
