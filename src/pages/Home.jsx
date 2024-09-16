import Card from "../components/Card";
import React, { useState, useEffect } from "react";
import { getRestaurants } from "../services/Restaurants";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCartItemsFromLocalStorage } from "../features/cart/cartSlice";
import localStorageFunctions from "../utils/localStorageFunctions";

export default function Homepage() {
  const navigate = useNavigate();
  const [restaurantList, setRestaurantList] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getRestaurants();
        let activeRestaurants = response?.data?.filter(
          (resto) => resto.isActive
        );
        setRestaurantList(activeRestaurants);
        setFilteredRestaurants(activeRestaurants);
      } catch (error) {
        console.error("Error --> ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    // setCartItem();
  }, []);

  function setCartItem() {
    let items = localStorageFunctions.getDatafromLocalstorage("cartItems");
    if (items) {
      setCartItemsFromLocalStorage(items);
    }
  }

  function handleSearchChange(e) {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = restaurantList.filter(
      (resto) =>
        resto.name?.toLowerCase()?.includes(query) ||
        resto.cuisine?.toLowerCase()?.includes(query)
    );
    setFilteredRestaurants(filtered);
  }

  function handleCardClicked(data) {
    let restaurantId = data._id;
    navigate(`/restaurant/${restaurantId}`, { state: { data } });
  }

  return (
    <>
      <div className="text-center">
        <div className="mb-8">
          <h1 className="text-2xl font-bold">Book your food</h1>
          <p className="uppercase">Save your time and save your money</p>
        </div>

        <div className="text-center mt-2">
          <div className="flex justify-center items-center space-x-2">
            <input
              className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
              type="email"
              placeholder="Enter Cafe Name or Cuisine"
              value={searchQuery}
              onChange={handleSearchChange}
            ></input>
          </div>
        </div>

        <div className="pt-8 flex justify-center">
          {loading ? (
            <div>Loading...</div>
          ) : !filteredRestaurants.length ? (
            <div>No Restaurant/Cuisine found, with the given name.</div>
          ) : (
            <div className="flex flex-wrap justify-center gap-4 md:gap-12">
              {filteredRestaurants.map((resto) => (
                <Card
                  key={resto._id}
                  obj={resto}
                  cardClicked={(data) => handleCardClicked(data)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
