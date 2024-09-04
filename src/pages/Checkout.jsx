import React, { useState, useEffect } from "react";
import { Trash } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import {
  increament,
  decreament,
  deletefromCart,
  getTotalAmount,
} from "../features/cart/cartSlice";
import PaymentForm from "../components/PaymentForm";
import Notification from "../components/Notification";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import TnC from "../components/TnC";
import PrivacyPolicy from "../components/PrivacyPolicy";
import RefundsandCancellation from "../components/Refunds&Cancellations";
import ShippingPolicy from "../components/ShippingPolicy";
import { Button } from "@material-tailwind/react";

export default function Checkout() {
  const navigate = useNavigate();
  const cartArr = useSelector((state) => state.cart.value);
  const dispatch = useDispatch();
  const totalAmount = useSelector(getTotalAmount);
  const [makepayment, setMakepayment] = useState(false);
  const { user, isAuthenticated } = useAuth0();
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
  });

  useEffect(() => {
    if (isAuthenticated) {
      const setUserDetails = async () => {
        try {
          console.log("user ------------------------- ", user);
        } catch (error) {
          console.error("Error calling API:", error);
        }
      };

      setUserDetails();
    }
  }, [isAuthenticated, user]);

  const removeFromCartClicked = (item) => {
    dispatch(decreament(item));
  };

  const addToCartClicked = (item) => {
    dispatch(increament(item));
  };

  useEffect(() => {
    if (!cartArr.length) {
      navigate("/");
    }
  }, [cartArr, navigate]);

  useEffect(() => {
    if (user?.name !== user?.email) {
      setFormData((prevFormData) => ({ ...prevFormData, name: user.name }));
    }
    console.log("user ---------- ", user);
  }, [user]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));
  };

  return (
    <div className="mx-auto my-4 max-w-4xl md:my-6">
      <div className="overflow-hidden rounded-xl shadow">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Contact Info */}
          <div className="px-5 py-6 text-gray-900 md:px-8">
            <div className="flow-root">
              <div className="-my-6 divide-y divide-gray-200">
                <div className="py-6">
                  <form>
                    <div className="mx-auto max-w-2xl px-4 lg:max-w-none lg:px-0">
                      <div>
                        <h3
                          id="contact-info-heading"
                          className="text-lg font-semibold text-gray-900"
                        >
                          Contact information
                        </h3>
                        <div className="mt-4 w-full">
                          <label
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            htmlFor="name"
                          >
                            Full Name
                          </label>
                          <input
                            className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                            value={formData.name}
                            type="text"
                            placeholder="Enter your name"
                            id="name"
                            onChange={handleChange}
                          />
                        </div>
                        <div className="mt-4 w-full">
                          <label
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            htmlFor="mobile"
                          >
                            Mobile
                          </label>
                          <input
                            className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                            type="text"
                            onChange={handleChange}
                            value={formData.mobile}
                            placeholder="Enter your mobile"
                            id="mobile"
                          />
                        </div>
                      </div>
                      <PaymentForm
                        amount={totalAmount}
                        name={formData.name}
                        mobile={formData.mobile}
                      />
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 text-xs mt-6 text-center">
                      <div>
                        <TnC />
                      </div>
                      <div>
                        <PrivacyPolicy />
                      </div>
                      <div>
                        <RefundsandCancellation />
                      </div>
                      <div className="sm:col-start-2">
                        <ShippingPolicy />
                      </div>
                    </div>
                  </form>

                  {makepayment && (
                    <Notification
                      msg="This feature will be available soon."
                      close={() => setMakepayment(false)}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
          {/* Product List */}
          <div className="bg-gray-100 px-5 py-6 md:px-8">
            <div className="flow-root">
              <ul className="-my-7 divide-y divide-gray-200">
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
                        ₹{cartItem.size.price}
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
        </div>
      </div>
    </div>
  );
}
