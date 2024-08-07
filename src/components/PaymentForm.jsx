import React from "react";
import axios from "axios";
import { createOrder } from "../services/Order";
import { useSelector, useDispatch } from "react-redux";
import localStorageFunctions from "../utils/localStorageFunctions.js";
import { reset } from "../features/cart/cartSlice";
import { useAuth0 } from "@auth0/auth0-react";

const PaymentForm = (props) => {
  const cartArr = useSelector((state) => state.cart.value);
  const dispatch = useDispatch();
  const { user, loginWithRedirect } = useAuth0();

  const handlePaymentSuccess = async (response) => {
    try {
      const verifyResponse = await axios.post(
        "http://localhost:3000/order/payment/verify",
        response
      );
      if (verifyResponse.status == 200) {
        alert(verifyResponse.data);
        let orderCreatedRes = await createOrder({
          orderId: response.razorpay_order_id,
          paymentId: response.razorpay_payment_id,
          userId: localStorageFunctions.getDatafromLocalstorage("userId"),
          amount: props.amount,
          name: props.name,
          mobile: props.mobile,
          orderData: cartArr,
        });
        console.log('orderCreatedRes ------------ ',orderCreatedRes);
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
      const orderResponse = await axios.post(
        "http://localhost:3000/order/payment",
        { amount: props.amount }
      );
      const orderData = orderResponse.data;

      const options = {
        key: "rzp_test_H6kJXc2zJz8jsi",
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Your Company Name",
        description: "Test Transaction",
        order_id: orderData.id,
        handler: handlePaymentSuccess,
        prefill: {
          name: "Himanshu Sharma",
          email: "hishrma02@gmail.com",
          contact: "8449844583",
        },
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
        ) : (<button
          type="submit"
          className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          onClick={handleSubmit}
        >
          Make Payment
        </button>)
        }

      </div>
    </div>
  );
};

export default PaymentForm;
