import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";
// import LandingPage from "./pages/Landing.jsx";

export default function Base() {
  return (
    <>
      <Navbar />
      <div className="max-w-screen-lg mx-auto px-4 my-8">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}
