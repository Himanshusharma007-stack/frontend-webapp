import { useParams } from "react-router-dom";
import { getRestaurantsMenuById } from "../services/Restaurants";
import { useState, useEffect } from "react";
import MenuCard from "../components/MenuCard";

export default function RestoMenu() {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [menus, setMenus] = useState([]);
  async function getMenuByRestoId() {
    try {
      setLoading(true);
      let res = await getRestaurantsMenuById(id);
      console.log("res -----> ", res);
      setMenus(res?.data);
    } catch (error) {
      throw new Error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getMenuByRestoId();
  }, []);

  return (
    <>

    <h1></h1>

    {
      menus.map((elem, index) => {
        return (
          <div>
            <MenuCard item={elem} />
            {index < menus.length - 1 && <hr />}
          </div>
        )
      })
    }
    </>
  );
}
