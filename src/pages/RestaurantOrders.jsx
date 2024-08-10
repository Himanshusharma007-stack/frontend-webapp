import DynamicTable from "../components/DynamicTable";
import { useState, useEffect, useMemo } from "react";
import { getOrdersDataRestaurantId } from "../services/Order";

export default function RestaurantOrders() {
  let [isLoading, setIsLoading] = useState(false);
  let [orderData, setOrderData] = useState([]);
  let header = [
    {
      title: "Name",
      value: "user.name",
    },
    { title: "Class", value: "clas" },
    { title: "Mobile", value: "mobile" },
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
      <DynamicTable
        header={header}
        items={orderData}
        refresh={() => refreshBtnClicked()}
        isLoading={isLoading}
      />
    </>
  );
}
