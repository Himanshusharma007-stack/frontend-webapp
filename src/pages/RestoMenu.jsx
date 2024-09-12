import { useParams } from "react-router-dom";
import { getRestaurantsMenuById } from "../services/Restaurants";
import { useState, useEffect } from "react";
import MenuCard from "../components/MenuCard";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { add, increament, decreament } from "../features/cart/cartSlice";
import {
  Button,
  Dialog,
  DialogBody,
  DialogHeader,
  DialogFooter,
} from "@material-tailwind/react";
import { Select, Option } from "@material-tailwind/react";
import { X } from "lucide-react";

export default function RestoMenu() {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [menus, setMenus] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredList, setFilteredList] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [open, setOpen] = useState(false);
  const [sizeVal, setSizeVal] = useState({});

  const location = useLocation();
  const { data } = location.state || {};

  const cart = useSelector((state) => state.cart.value);
  const dispatch = useDispatch();

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
    setFilteredList(filtered);
  }

  function handleOpen(item) {
    setSelectedItem(item);
    setOpen(!open);
  }

  function addClicked(item) {
    let computedItem = { ...item };
    computedItem["size"] = sizeVal;
    console.log("computedItem --- ", computedItem);

    dispatch(add(computedItem));
    setOpen(false);
    setSizeVal({});
  }

  function decreamentBtnClicked(item) {
    dispatch(decreament(item));
  }

  function increamentBtnClicked(item) {
    dispatch(increament(item));
  }

  const handleSizeChange = (val) => {
    if (selectedItem && selectedItem.size) {
      const selectedSize = selectedItem.size.find((item) => item.value === val);
      setSizeVal(selectedSize || {}); // Set an empty object if no size is found
    }
  };

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
        type="text"
        placeholder="Search for dishes"
        value={searchQuery}
        onChange={handleSearchChange}
      />

      {!filteredList.length ? (
        <div className="p-4">
          No dish found, with the given title/description.
        </div>
      ) : (
        filteredList.map((elem, index) => (
          <div key={index}>
            <MenuCard
              item={cart.find((item) => item._id === elem._id) || elem}
              priceRange={elem.size && elem.size?.length == 3
                ? `${elem?.size[0]?.price} - ${elem?.size[2]?.price}`
                : elem.size && elem.size?.length == 2
                ? `${elem?.size[0]?.price} - ${elem?.size[1]?.price}`
                : elem.size && elem?.size[0]?.price || 0}
              addClicked={() => handleOpen(elem)}
              decreamentBtnClicked={() => decreamentBtnClicked(elem)}
              increamentBtnClicked={() => increamentBtnClicked(elem)}
            />
            {index < filteredList.length - 1 && <hr />}
          </div>
        ))
      )}

      <Dialog open={open} handler={handleOpen} className="p-4">
        <DialogHeader className="flex justify-between items-center">
          {selectedItem?.name}
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="rounded-full"
          >
            <X className="h-6 w-6" aria-hidden="true" />
          </Button>
        </DialogHeader>
        <DialogBody>
          <Select
            label="Select Size"
            value={sizeVal.value || ""}
            onChange={(val) => handleSizeChange(val)}
          >
            {selectedItem?.size?.map((item, index) => (
              <Option key={index} value={item.value}>
                {item.label || item.value} {`( ₹${item.price} )`}
              </Option>
            ))}
          </Select>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="gradient"
            color="green"
            onClick={() => addClicked(selectedItem)}
          >
            Add to Cart
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
