import DynamicTable from "../components/DynamicTable";
import { useState, useEffect, useMemo } from "react";
import { getOrdersDataRestaurantId } from "../services/Order";
import statusChecker from "../utils/checkStatus.js";

export default function RestaurantOrders() {
  let [isLoading, setIsLoading] = useState(false);
  let [orderData, setOrderData] = useState([]);
  let header = [
    {
      title: "Name",
      value: "userName",
    },
    { title: "Items", value: "items" },
    { title: "Amount(in ₹)", value: "amount" },
    { title: "Status", value: "status" },
    { title: "Action", value: "edit" },
  ];

  let items = [
    { name: "Himanshu", clas: "MCA", mobile: "8449844583" },
    { name: "Himanshu", clas: "MCA", mobile: "8449844583" },
    // {name: 'Himanshu', clas: 'MCA', mobile: '8449844583'},
    // {name: 'Himanshu', clas: 'MCA', mobile: '8449844583'},
    // {name: 'Himanshu', clas: 'MCA', mobile: '8449844583'},
    // {name: 'Himanshu', clas: 'MCA', mobile: '8449844583'},
  ];

  async function getOrdersData() {
    try {
      setIsLoading(true);
      let { data } = await getOrdersDataRestaurantId(
        "66754cba683f5fe524cd2ea6"
      );
      console.log("orders data ----------------> ", data);
      setOrderData(data);
    } catch (error) {
      console.error("Error while fetching orders data ----> ", error);
      throw new Error(error);
    } finally {
      setIsLoading(false);
    }
  }

  // Compute the order data
  const computedOrderData = useMemo(() => {
    return orderData.map((data) => {
      return { _id: data?._id, amount: data?.amount, items: data?.items?.map((item) => item?.name)?.join(', '), userName: data?.user?.name, userMobile: data?.user?.mobile, userEmail: data?.user?.email, status: statusChecker.checkStatus(data) }
    })
  }, [orderData]);

  useEffect(() => {
    getOrdersData();
  }, []);

  async function refreshBtnClicked() {
    try {
      await getOrdersData();
    } catch (error) {
      console.error("Error while refreshing ----> ", error);
      throw new Error(error);
    }
  }

  return (
    <>
      <div className="font-bold text-2xl text-black">Restaurant order tab</div>
      {/* <div>{JSON.stringify(computedOrderData)}</div> */}
        <DynamicTable
          header={header}
          items={computedOrderData}
          refresh={() => refreshBtnClicked()}
          isLoading={isLoading}
        />
    </>
  );
}
