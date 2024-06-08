import { useParams } from "react-router-dom";
import { getRestaurantsMenuById } from "../services/Restaurants";
import { useState, useEffect } from "react";
import MenuCard from "../components/MenuCard";
import { useLocation } from "react-router-dom";

export default function RestoMenu() {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [menus, setMenus] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredList, setFilteredList] = useState([]);

  const location = useLocation();
  const { data } = location.state || {};

  async function getMenuByRestoId() {
    try {
      setLoading(true);
      let res = await getRestaurantsMenuById(id);
      setMenus(res?.data);
      setFilteredList(res?.data);
    } catch (error) {
      throw new Error(error);
    } finally {
      setLoading(false);
    }
  }

  function handleSearchChange(e) {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = menus.filter(
      (resto) =>
        resto.name.toLowerCase().includes(query) ||
        resto.description.toLowerCase().includes(query)
    );
    if (filtered?.length) {
      setFilteredList(filtered);
    } else {
      setFilteredList([]);
    }
  }

  useEffect(() => {
    getMenuByRestoId();
  }, []);

  return (
    <>
      <div className="text-center uppercase">
        <h1 className="text-xl font-bold">{data?.name}</h1>
        <p className="text-lg font-light">{data?.cuisine}</p>
      </div>
      <input
        className="flex mt-4 h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
        type="email"
        placeholder="Search for dishes"
        value={searchQuery}
        onChange={handleSearchChange}
      ></input>

      {!filteredList.length ? (
        <div className="mt-4">
          No dish found, with the given title/description.
        </div>
      ) : (
        filteredList.map((elem, index) => {
          return (
            <div>
              <MenuCard item={elem} />
              {index < filteredList.length - 1 && <hr />}
            </div>
          );
        })
      )}
    </>
  );
}
