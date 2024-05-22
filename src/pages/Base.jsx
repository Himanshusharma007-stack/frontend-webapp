import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";
// import LandingPage from "./pages/Landing.jsx";

export default function Base() {
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
