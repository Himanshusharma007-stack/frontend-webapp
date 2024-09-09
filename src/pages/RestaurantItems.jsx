import { Table } from "../components/Table";
import { useLocation } from "react-router-dom";
import { getRestaurantsMenuById } from "../services/Restaurants";
import { isUserAuthenticated } from "../services/Auth";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import localStorageFunctions from "../utils/localStorageFunctions.js";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import RestaurantOrders from "./RestaurantOrders.jsx";

export default function RestaurantItems() {
  const location = useLocation();
  const [data, setData] = useState({});
  const [menuItems, setMenuItems] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  const [filteredList, setFilteredList] = useState([]);
  const navigate = useNavigate();
  const [token, setToken] = useState(null);

  const tabData = [
    {
      label: "Menu",
      value: "menu",
      desc: `It really matters and then like it really doesn't matter.
      What matters is the people who are sparked by it. And the people 
      who are like offended by it, it doesn't matter.`,
    },
    {
      label: "Orders",
      value: "orders",
      desc: `Because it's about motivating the doers. Because I'm here
      to follow my dreams and inspire other people to follow their dreams, too.`,
    },
  ];

  useEffect(() => {
    const storedToken = localStorageFunctions.getDatafromLocalstorage("token");
    if (storedToken) {
      setToken(storedToken);
    } else {
      redirectToLogin();
    }
  }, []); // Run once on mount to get the token

  async function getMenuByRestoId() {
    try {
      setIsloading(true);
      let res = await getRestaurantsMenuById(data._id);
      setMenuItems(res?.data);
      setFilteredList(res?.data);
    } catch (error) {
      console.error("Error fetching menu:", error);
    } finally {
      setIsloading(false);
    }
  }

  function redirectToLogin() {
    navigate("/restaurant/login-or-signup");
    localStorageFunctions.removeDatafromLocalstorage("token");
    localStorageFunctions.removeDatafromLocalstorage("data");
  }

  async function checkUserIsAuthenticated() {
    try {
      let res = await isUserAuthenticated();
      if (!res.success) redirectToLogin();
    } catch (error) {
      console.log("error --------------- ", error);
      redirectToLogin();
    }
  }

  useEffect(() => {
    if (token) {
      // console.log("Token exists: ", token);
      checkUserIsAuthenticated();
    }
  }, [token]);

  useEffect(() => {
    if (data?._id) {
      getMenuByRestoId();
    }
  }, [data]);

  useEffect(() => {
    let dataValue =
      localStorageFunctions.getDatafromLocalstorage("data") ||
      location.state?.data ||
      {};
    setData(dataValue);
  }, []);

  return (
    <>
      <div className="text-center mb-4">
        <h1 className="text-xl font-bold">{data?.name}</h1>
        <p className="text-lg font-light">{data?.address}</p>
      </div>
      <div className="md:w-[60rem]">
        <Tabs value="menu">
          <TabsHeader>
            {tabData.map(({ label, value }) => (
              <Tab key={value} value={value}>
                {label}
              </Tab>
            ))}
          </TabsHeader>
          <TabsBody>
            <TabPanel value={"menu"}>
              <Table
                data={menuItems}
                getMenuByRestoId={() => getMenuByRestoId()}
                isLoading={isLoading}
              />
            </TabPanel>
            <TabPanel value={"orders"}>
              <RestaurantOrders restaurantData={data} />
            </TabPanel>

          </TabsBody>
        </Tabs>
      </div>
    </>
  );
}
