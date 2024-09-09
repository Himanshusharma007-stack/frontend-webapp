import DynamicTable from "../components/DynamicTable";
import { useState, useEffect, useMemo } from "react";
import { getOrdersDataRestaurantId } from "../services/Order";
import statusChecker from "../utils/checkStatus.js";
import { Pencil } from "lucide-react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Select,
  Option,
} from "@material-tailwind/react";
// updateOrderStatus
import { updateOrderStatus } from "../services/Order";

export default function RestaurantOrders(props) {
  let [isLoading, setIsLoading] = useState(false);
  let [orderData, setOrderData] = useState([]);
  const [editDialog, setEditDialog] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});
  const [status, setStatus] = useState(null);
  const [editDialogLoading, setEditDialogLoading] = useState(false);
  let header = [
    {
      title: "Username / Usermobile",
      value: "userName",
      render: (item) => (
        <div className="text-sm font-normal">
          <div>{item.userName}</div>
          <div>{item.userMobile}</div>
        </div>
      ),
    },
    { title: "Items", value: "items" },
    { title: "Amount(in ₹)", value: "amount" },
    {
      title: "Status",
      value: "status",
      render: (item) => (
        <div
          className={`text-sm font-medium truncate ${
            item.status === "Preparing"
              ? "text-preparing"
              : item.status === "Ready"
              ? "text-ready"
              : item.status === "Delivered"
              ? "text-delivered"
              : "text-gray-700"
          }`}
        >
          {statusChecker.checkStatus(item)}
        </div>
      ),
    },
    {
      title: "Action",
      value: "edit",
      render: (item) => (
        <button
          disabled={item.status === "Delivered" ? true : false}
          onClick={() => editClicked(item)}
        >
          <Pencil
            className={`h-4 ${
              item.status === "Delivered" ? "text-gray-400" : ""
            }`}
          />
        </button>
      ),
    },
  ];

  async function updateStatus() {
    try {
      setEditDialogLoading(true);
      let res = await updateOrderStatus({ orderId: selectedItem._id, status });
      console.log("res -------------------> ", res);
      if (res.success) {
        setEditDialog(false);
        refreshBtnClicked();
        setStatus(null);
      }
    } catch (error) {
      console.error("Error while updating orders data ----> ", error);
      throw new Error(error);
    } finally {
      setEditDialogLoading(false);
    }
  }

  function editClicked(item) {
    // console.log('edit clicked --- ',item);
    setSelectedItem(item);
    setEditDialog(!editDialog);
  }

  async function getOrdersData() {
    try {
      setIsLoading(true);
      let { data } = await getOrdersDataRestaurantId(
        props.restaurantData?._id
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
      return {
        _id: data?._id,
        amount: data?.amount,
        items: data?.items?.map((item) => item?.name)?.join(", "),
        userName: data?.user?.name,
        userMobile: data?.user?.mobile,
        userEmail: data?.user?.email,
        isDelivered: data?.isDelivered,
        prepareUpto: data?.prepareUpto,
        status: statusChecker.checkStatus(data),
      };
    });
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
      <DynamicTable
        header={header}
        items={computedOrderData}
        refresh={() => refreshBtnClicked()}
        isLoading={isLoading}
      />

      <Dialog open={editDialog}>
        <DialogHeader>
          {selectedItem.userName}({selectedItem.userMobile})
        </DialogHeader>

        <DialogBody>
          <div>
            Are you sure you wants to change the status of{" "}
            <strong> {selectedItem?.userName}</strong>, who has ordered{" "}
            <strong>{selectedItem?.items}</strong> with an amount of{" "}
            <strong> ₹{selectedItem?.amount} </strong> ?
          </div>
          <div className="mt-3">
            <Select
              label="Status"
              value={status}
              onChange={(val) => setStatus(val)}
            >
              {[
                // { name: "Ready", value: "isReady" },
                { name: "Delivered", value: "isDelivered" },
              ].map((status) => (
                <Option value={status.value} key={status.value}>
                  {status.name}
                </Option>
              ))}
            </Select>
          </div>
        </DialogBody>

        <DialogFooter>
          <Button
            variant="text"
            color="red"
            disabled={editDialogLoading}
            onClick={() => setEditDialog(false)}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button
            variant="gradient"
            color="blue"
            disabled={!status || editDialogLoading}
            loading={editDialogLoading}
            onClick={() => updateStatus()}
          >
            <span>Update</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
