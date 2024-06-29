import { Table } from "../components/Table";
import { useLocation } from "react-router-dom";
import { getRestaurantsMenuById } from "../services/Restaurants";
import { isUserAuthenticated } from "../services/Auth";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import localStorageFunctions from "../utils/localStorageFunctions.js";

export default function RestaurantItems() {
  const location = useLocation();
  const [data, setData] = useState({});
  const [menuItems, setMenuItems] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  const [filteredList, setFilteredList] = useState([]);
  const navigate = useNavigate();
  const [token, setToken] = useState(null);

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
        <Table data={menuItems} getMenuByRestoId={() => getMenuByRestoId()} isLoading={isLoading} />
      </div>
    </>
  );
}
