import { useParams } from "react-router-dom";
import { getRestaurantsMenuById } from "../services/Restaurants";
import { useState, useEffect } from "react";

export default function RestoMenu() {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [menus, setMenus] = useState([]);

  async function getMenuByRestoId() {
    try {
      setLoading(true);
      let res = await getRestaurantsMenuById(id);
      console.log("res -----> ", res);
      setMenus(res);
    } catch (error) {
      throw new Error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getMenuByRestoId();
  }, []);

  return <div>{JSON.stringify(menus)}</div>;
}
