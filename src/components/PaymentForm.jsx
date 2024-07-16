// client/src/components/PaymentForm.js

import React, { useState } from "react";
import axios from "axios";
// http://localhost:3000

const PaymentForm = (props) => {
  const [amount, setAmount] = useState("");

  const handlePaymentSuccess = async (response) => {
    try {
      const verifyResponse = await axios.post(
        "http://localhost:3000/order/payment/verify",
        response
      );
      console.log("verifyResponse ----------------- ", verifyResponse);
    //   {
    //     "data": "Payment is successful",
    //     "status": 200,
    //     "statusText": "OK",
    //     "headers": {
    //         "content-length": "21",
    //         "content-type": "text/html; charset=utf-8"
    //     },
    //     "config": {
    //         "transitional": {
    //             "silentJSONParsing": true,
    //             "forcedJSONParsing": true,
    //             "clarifyTimeoutError": false
    //         },
    //         "adapter": [
    //             "xhr",
    //             "http",
    //             "fetch"
    //         ],
    //         "transformRequest": [
    //             null
    //         ],
    //         "transformResponse": [
    //             null
    //         ],
    //         "timeout": 0,
    //         "xsrfCookieName": "XSRF-TOKEN",
    //         "xsrfHeaderName": "X-XSRF-TOKEN",
    //         "maxContentLength": -1,
    //         "maxBodyLength": -1,
    //         "env": {},
    //         "headers": {
    //             "Accept": "application/json, text/plain, */*",
    //             "Content-Type": "application/json"
    //         },
    //         "method": "post",
    //         "url": "http://localhost:3000/order/payment/verify",
    //         "data": "{\"razorpay_payment_id\":\"pay_OMdZCwqu8X03VI\",\"razorpay_order_id\":\"order_OMdYAElomyRqWb\",\"razorpay_signature\":\"4755b5b1ec1059ba647ef786271e1c6999e73639d0d90961745deccae6dfbaa7\"}"
    //     },
    //     "request": {}
    // }
      alert(verifyResponse.data);
    } catch (error) {
      console.error(error);
      alert("Payment verification failed");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("props.amount --------- ", props.amount);

      const orderResponse = await axios.post(
        "http://localhost:3000/order/create",
        { amount: props.amount }
      );
      console.log(
        "orderResponse ======================================= ",
        orderResponse
      );
    //   {
    //     "data": {
    //         "amount": 93600,
    //         "amount_due": 93600,
    //         "amount_paid": 0,
    //         "attempts": 0,
    //         "created_at": 1718367242,
    //         "currency": "INR",
    //         "entity": "order",
    //         "id": "order_OMdYAElomyRqWb",
    //         "notes": [],
    //         "offer_id": null,
    //         "receipt": null,
    //         "status": "created"
    //     },
    //     "status": 200,
    //     "statusText": "OK",
    //     "headers": {
    //         "content-length": "211",
    //         "content-type": "application/json; charset=utf-8"
    //     },
    //     "config": {
    //         "transitional": {
    //             "silentJSONParsing": true,
    //             "forcedJSONParsing": true,
    //             "clarifyTimeoutError": false
    //         },
    //         "adapter": [
    //             "xhr",
    //             "http",
    //             "fetch"
    //         ],
    //         "transformRequest": [
    //             null
    //         ],
    //         "transformResponse": [
    //             null
    //         ],
    //         "timeout": 0,
    //         "xsrfCookieName": "XSRF-TOKEN",
    //         "xsrfHeaderName": "X-XSRF-TOKEN",
    //         "maxContentLength": -1,
    //         "maxBodyLength": -1,
    //         "env": {},
    //         "headers": {
    //             "Accept": "application/json, text/plain, */*",
    //             "Content-Type": "application/json"
    //         },
    //         "method": "post",
    //         "url": "http://localhost:3000/order/create",
    //         "data": "{\"amount\":936}"
    //     },
    //     "request": {}
    // }
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
        <button
          type="submit"
          className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          onClick={handleSubmit}
        >
          Make payment
        </button>
      </div>
    </div>
  );
};

export default PaymentForm;
