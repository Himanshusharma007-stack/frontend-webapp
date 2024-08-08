import React, { useState, useEffect } from "react";
import { getUserById } from "../services/User";
import OrderCard from "../components/OrderCard";
import dateFormatter from "../utils/formatDate.js";
import { NoOrderFound } from "../components/NoOrderFound.jsx"; // Ensure correct import
import Notification from "../components/Notification";
import moment from "moment";

export function Orders() {
  const [ordersData, setOrdersData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setIsLoading(true);
        let userData = await getUserById("666d61f2f447d3be1433fb79");
        console.log("userData ---------- ", userData);
        setOrdersData(userData?.data?.orders || []);
      } catch (error) {
        console.error("Error --> ", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div>
      {!ordersData.length ? (
        <NoOrderFound />
      ) : (
        <div className="mx-auto my-4 max-w-6xl px-2 md:my-6 md:px-0">
          <h2 className="text-3xl font-bold">Order Details</h2>
          <div className="mt-3 text-sm mb-3">
            Check the status of recent and old orders
          </div>
          {ordersData
            .sort((a, b) => b?.orderId?.localeCompare(a?.orderId))
            ?.map((order) => (
              <>
                {order?.prepareUpto && !order?.isDelivered ? (
                  <Notification
                    msg={moment(new Date()).isBefore(moment(order?.prepareUpto)) ? `Your order will be prepared upto ${dateFormatter.formatDate(
                      order?.prepareUpto,
                      "MMMM Do YYYY, h:mm:ss a"
                    )}` : 'Your order is ready please take away from restaurant.'}
                    notificationClass="mt-6"
                    hideCloseBtn={true}
                  />
                ) : (
                  <span></span>
                )}
                <OrderCard
                  key={order.orderId}
                  items={order.data || []}
                  orderStatus={order?.isDelivered || false ? 'Delivered' : moment(new Date()).isAfter(moment(order?.prepareUpto)) ? 'Ready' : 'Preparing'}
                  rawData={{
                    orderId: order.orderId,
                    amount: order.amount,
                    createdAt: dateFormatter.formatDate(
                      order.createdAt,
                      "MMMM Do YYYY, h:mm:ss a"
                    ),
                  }}

                />
              </>
            ))}
        </div>
      )}
    </div>
  );
}
