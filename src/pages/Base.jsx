import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";
// import LandingPage from "./pages/Landing.jsx";

export default function Base() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}
