import React from "react";
import axios from "axios";
import { createOrder } from "../services/Order";
import { useSelector, useDispatch } from "react-redux";
import localStorageFunctions from "../utils/localStorageFunctions.js";
import { reset } from "../features/cart/cartSlice";
import { useAuth0 } from "@auth0/auth0-react";
let backendUrl = import.meta.env.VITE_BACKEND_DOMAIN_URL;

const PaymentForm = (props) => {
  const cartArr = useSelector((state) => state.cart.value);
  const dispatch = useDispatch();
  const { user, loginWithRedirect } = useAuth0();

  const handlePaymentSuccess = async (response) => {
    try {
      const verifyResponse = await axios.post(
        `${backendUrl}/order/payment/verify`,
        response
      );
      if (verifyResponse.status == 200) {
        let orderCreatedRes = createOrder({
          orderId: response.razorpay_order_id,
          paymentId: response.razorpay_payment_id,
          userId: localStorageFunctions.getDatafromLocalstorage("userId"),
          amount: props.amount,
          name: props.name?.trim(),
          mobile: props.mobile?.trim(),
          orderData: cartArr,
        });
        console.log("orderCreatedRes ------------ ", orderCreatedRes);
        dispatch(reset());
      }
    } catch (error) {
      console.error(error);
      alert("Payment verification failed");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const orderResponse = await axios.post(`${backendUrl}/order/payment`, {
        amount: props.amount,
      });
      const orderData = orderResponse.data;

      const options = {
        key: import.meta.env.VITE_RAZORPAY_key_id,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "DriveFood",
        description: "Test Transaction",
        order_id: orderData.id,
        handler: handlePaymentSuccess,
        // prefill: {
        //   name: "Himanshu Sharma",
        //   email: "hishrma02@gmail.com",
        //   contact: "8449844583",
        // },
        theme: {
          color: "#F37254",
        },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className="mt-10 flex justify-end border-gray-200 pt-2">
        {!user?.picture ? (
          <button
            type="submit"
            className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            onClick={() => loginWithRedirect()}
          >
            Login User
          </button>
        ) : (
          <button
            type="submit"
            className={`rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black ${
              props.name?.trim()?.length && /^[0-9]{10}$/.test(props.mobile)
                ? "bg-black"
                : "bg-gray-500"
            }`}
            onClick={handleSubmit}
            disabled={!(props.name?.trim()?.length && /^[0-9]{10}$/.test(props.mobile))}
          >
            Make Payment
          </button>
        )}
      </div>
    </div>
  );
};

export default PaymentForm;
