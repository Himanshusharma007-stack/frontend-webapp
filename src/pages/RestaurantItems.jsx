import { Button } from "@material-tailwind/react";
import { Table } from "../components/Table";
import { useLocation } from "react-router-dom";
import { getRestaurantsMenuById } from "../services/Restaurants";
import { isUserAuthenticated } from "../services/Auth";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import localStorageFunctions from "../utils/localStorageFunctions.js";

export default function RestaurantItems() {
  const location = useLocation();
  const { data } = location.state || {}; // destructuring state object
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filteredList, setFilteredList] = useState([]);
  const navigate = useNavigate();
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorageFunctions.getDatafromLocalstorage('token')
    if (storedToken) {
      setToken(storedToken);
    }
  }, []); // Run once on mount to get the token

  async function getMenuByRestoId() {
    try {
      setLoading(true);
      let res = await getRestaurantsMenuById(data._id);
      setMenuItems(res?.data);
      setFilteredList(res?.data);
    } catch (error) {
      throw new Error(error);
    } finally {
      setLoading(false);
    }
  }

  function redirectToLogin() {
    navigate("/restaurant/login-or-signup");
    localStorageFunctions.removeDatafromLocalstorage("token");
    localStorageFunctions.removeDatafromLocalstorage("data");
  }

  async function checkUserIsAuthenticated() {
    console.log("call checkUserIsAuthenticated");
    try {
      let res = await isUserAuthenticated();
      console.log("res ------- ", res);
      if (!res.success) redirectToLogin();
    } catch (error) {
      console.log("error --------------- ", error);
      redirectToLogin();
      throw new Error(error);
    }
  }

  useEffect(() => {
    if (token) {
      console.log('Token exists: ', token);
      checkUserIsAuthenticated();
    }
  }, [token]);

  useEffect(() => {
    getMenuByRestoId();
  }, []);

  return (
    <>
      <div className="text-center mb-4">
        <h1 className="text-xl font-bold">{data.name}</h1>
        <p className="text-lg font-light">{data?.address}</p>
      </div>
      <div className="md:w-[60rem]">
        <Table data={menuItems} />
      </div>
    </>
  );
}
