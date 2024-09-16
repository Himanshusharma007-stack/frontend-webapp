import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";
import { useSetCartItemsFromLocalStorage } from "../features/cart/cartSlice";

export default function Base() {
  // Fetch cart items from localStorage on page load or refresh
  useSetCartItemsFromLocalStorage();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow max-w-screen-lg mx-auto px-4 my-8">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
