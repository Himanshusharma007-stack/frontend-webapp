import { Button } from "@material-tailwind/react";
import { Table } from "../components/Table";
import { useLocation } from "react-router-dom";
import { getRestaurantsMenuById } from "../services/Restaurants";
import { useState, useEffect } from 'react'

export default function RestaurantItems() {
  const location = useLocation();
  const { data } = location.state || {}; // destructuring state object
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(false)
  const [filteredList, setFilteredList] = useState([]);

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

  useEffect(() => {
    getMenuByRestoId()
  }, [])

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
