import React from "react";
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  Input,
  Radio,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";
import {
  increament,
  decreament,
  deletefromCart,
  getTotalAmount,
  reset,
} from "../features/cart/cartSlice";
import { Trash } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { createOrderByRestaurant } from "../services/Order";

export default function BillingDialog() {
  const [open, setOpen] = React.useState(false);
  const cartArr = useSelector((state) => state.cart.value);
  const [loading, setLoading] = React.useState({
    createOrder: false,
  });
  const totalAmount = useSelector(getTotalAmount);
  const dispatch = useDispatch();
  const [formData, setFormData] = React.useState({
    customerName: null,
    customerMobile: null,
    type: "dineIn",
    paymentMode: "cash"
  });

  const [errors, setErrors] = React.useState({
    customerName: "",
    customerMobile: "",
  });

  const handleOpen = () => setOpen(!open);

  const removeFromCartClicked = (item) => {
    dispatch(decreament(item));
  };

  const addToCartClicked = (item) => {
    dispatch(increament(item));
  };

  const validateFields = () => {
    let valid = true;
    const newErrors = {};

    if (!formData.customerName?.trim()) {
      newErrors.customerName = "Customer name is required.";
      valid = false;
    }

    if (!/^\d{10}$/.test(formData.customerMobile)) {
      newErrors.customerMobile = "Mobile number must be 10 digits.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };


  const handleChange = (e) => {
    const { id, value, type: inputType, name } = e.target;

    if (inputType === "radio") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [id]: value,
      }));
    }
  };

  function resetFields() {
    setFormData({
      customerName: null,
      customerMobile: null,
      type: "dineIn",
      paymentMode: 'cash'
    });
    setErrors({});
    dispatch(reset());
  }

  async function createOrder() {
    if (!validateFields()) return;
    try {
      setLoading({ createOrder: true });
      let obj = {
        amount: totalAmount,
        name: formData.customerName,
        mobile: formData.customerMobile,
        orderType: formData.type,
        paymentMode: formData.paymentMode,
        orderData: cartArr,
      };
      let res = await createOrderByRestaurant(obj);
      if (res.success) {
        handleOpen();
        resetFields();
      }
    } catch (e) {
      console.error("Error -----> ", e);
      throw new Error(e);
    } finally {
      setLoading({ createOrder: false });
    }
  }

  React.useEffect(() => {
    validateFields()
  }, [formData.customerMobile, formData.customerName])

  return (
    <>
      {!cartArr?.length ? (
        <Tooltip content="Add something to create billing" placement="bottom">
          <Button variant="gradient">Create Bill</Button>
        </Tooltip>
      ) : (
        <Button onClick={handleOpen} variant="gradient">
          Create Bill
        </Button>
      )}
      <Dialog open={open} handler={handleOpen}>
        <DialogBody>
          <div className="font-bold text-lg mb-4 text-black flex justify-between">
            <div>Enter Customer Details.</div>


            <IconButton
              color="blue-gray"
              size="sm"
              variant="text"
              onClick={handleOpen}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </IconButton>
          </div>
          <div>
            <div className="md:flex">
            <div className="w-full">
                <Input
                  label="Enter Customer Name*"
                  value={formData.customerName}
                  id="customerName"
                  onChange={handleChange}
                  error={!!errors.customerName}
                />
                {errors.customerName && (
                  <p className="text-red-500 text-sm">{errors.customerName}</p>
                )}
              </div>
              &nbsp;
              <div className="w-full">
                <Input
                  label="Enter Customer Mobile*"
                  value={formData.customerMobile}
                  id="customerMobile"
                  onChange={handleChange}
                  error={!!errors.customerMobile}
                />
                {errors.customerMobile && (
                  <p className="text-red-500 text-sm">{errors.customerMobile}</p>
                )}
              </div>
            </div>

            <div className="flex justify-between">
            <div>
              <Radio
                name="type"
                label="Dine In"
                value="dineIn"
                checked={formData.type === "dineIn"}
                onChange={handleChange}
              />
              <Radio
                name="type"
                label="Take Away"
                value="takeAway"
                checked={formData.type === "takeAway"}
                onChange={handleChange}
              />
            </div>

            <div>
            <Radio
                name="paymentMode"
                label="Cash"
                value="cash"
                checked={formData.paymentMode === "cash"}
                onChange={handleChange}
              />
              <Radio
                name="paymentMode"
                label="Online"
                value="online"
                checked={formData.paymentMode === "online"}
                onChange={handleChange}
              />
            </div>
            </div>
          </div>

          {/* Product List */}
          <div className="bg-gray-100 px-5 py-6 md:px-8">
            <div className="flow-root">
              <ul className="-my-7 divide-y divide-gray-200 overflow-scroll h-36">
                {cartArr.map((cartItem) => (
                  <li
                    key={cartItem._id}
                    className="flex items-stretch justify-between space-x-5 py-7"
                  >
                    {/* {JSON.stringify(cartItem)} */}
                    <div className="flex flex-1 items-stretch">
                      <div className="flex-shrink-0">
                        {cartItem.imageUrl ? (
                          <img
                            className="h-20 w-20 rounded-lg border border-gray-200 bg-white object-contain"
                            src={cartItem.imageUrl}
                            alt={cartItem.imageUrl}
                          />
                        ) : (
                          <div className="h-20 w-20 flex items-center justify-center bg-gray-300 text-gray-500">
                            No Image
                          </div>
                        )}
                      </div>
                      <div className="ml-5 flex flex-col justify-between">
                        <div className="flex-1">
                          <p className="text-sm font-bold">{cartItem.name}</p>
                          <p className="text-xs font-light text-slate-200	">
                            {cartItem.size?.label}
                          </p>
                          <p className="text-xs font-semibold line-clamp-3">
                            {cartItem.description}
                          </p>
                        </div>
                        <p className="mt-4 text-xs font-medium ">
                          <Button
                            size="sm"
                            variant="text"
                            onClick={() => removeFromCartClicked(cartItem)}
                          >
                            -
                          </Button>
                          &nbsp; &nbsp;
                          {cartItem.quantity}
                          &nbsp; &nbsp;
                          <Button
                            size="sm"
                            variant="text"
                            onClick={() => addToCartClicked(cartItem)}
                          >
                            +
                          </Button>
                        </p>
                      </div>
                    </div>
                    <div className="ml-auto flex flex-col items-end justify-between">
                      <p className="text-right text-sm font-bold text-gray-900">
                        ₹{cartItem.size?.price || cartItem.price}
                      </p>
                      <button
                        type="button"
                        className="-m-2 inline-flex rounded p-2 text-gray-400 transition-all duration-200 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 hover:scale-110"
                        onClick={() => dispatch(deletefromCart(cartItem))}
                      >
                        <Trash className="h-5 w-5 text-red-500" />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <hr className="mt-6 border-gray-200" />
            <ul className="mt-4 space-y-3">
              <li className="flex items-center justify-between text-gray-900">
                <p className="text-sm font-medium">Total</p>
                <p className="text-sm font-bold">₹{totalAmount}</p>
              </li>
            </ul>
          </div>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="gradient"
            color="green"
            loading={loading.createOrder}
            onClick={createOrder}
            disabled={!cartArr?.length || loading.createOrder || errors.customerName || errors.customerMobile}
          >
            <span>Create Order</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
