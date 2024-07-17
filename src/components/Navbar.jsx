import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import CartIcon from "../assets/navbar/cart.png";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import localStorageFunctions from "../utils/localStorageFunctions.js";
import DrawerComp from "./Drawer.jsx";
import AvatarDropdown from "./Avatar.jsx";
import { useAuth0 } from "@auth0/auth0-react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const cart = useSelector((state) => state.cart.value);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, loginWithRedirect } = useAuth0();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const openDrawer = () => {
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  function logoutClicked() {
    navigate("/restaurant/login-or-signup");
    localStorageFunctions.removeDatafromLocalstorage("token");
    localStorageFunctions.removeDatafromLocalstorage("data");
  }

  return (
    <div className="relative w-full">
      <div
        className={`mx-auto flex max-w-7xl items-center justify-between px-4 py-2 sm:px-6 lg:px-8 ${
          isDrawerOpen ? "blur-sm" : ""
        }`}
      >
        <div className="inline-flex items-center space-x-2">
          <DrawerComp isOpen={isDrawerOpen} onClose={closeDrawer} />
        </div>

        <div className=" lg:block">
          <div className="flex justify-center">
            {!user?.picture && <Link className="font-bold" onClick={() => loginWithRedirect()}>
              Login/Signup
            </Link>}
            <AvatarDropdown/>
            {location.pathname !== "/restaurant/items-list" ? (
              <>
                {cart?.length > 0 && (
                  <button className="relative ml-3">
                    <Link className="font-bold" to="/checkout">
                      <img
                        src={CartIcon}
                        className="h-10 w-10"
                        alt="Shopping Cart"
                      />
                      {cart?.length > 0 && (
                        <div>
                          <span className="animate-ping absolute top-0 right-0 -mt-2 -mr-2 inline-flex items-center justify-center h-5 w-5 rounded-full bg-red-500 text-white text-xs font-medium"></span>
                          <span className="absolute top-0 right-0 -mt-2 -mr-2 inline-flex items-center justify-center h-5 w-5 rounded-full bg-red-500 text-white text-xs font-medium">
                            {cart?.length}
                          </span>
                        </div>
                      )}
                    </Link>
                  </button>
                )}
              </>
            ) : (
              <button
                type="button"
                className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                onClick={logoutClicked}
              >
                Logout
              </button>
            )}
          </div>
        </div>
        <div className="hidden">
          <DrawerComp isOpen={isDrawerOpen} onClose={closeDrawer} />
        </div>
        {isMenuOpen && (
          <div className="absolute inset-x-0 top-0 z-100 origin-top-right transform p-2 transition lg:hidden">
            <div className="divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
              <div className="px-5 pb-6 pt-5">
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center space-x-2">
                    <button className="font-bold">Sahyog Sabka</button>
                  </div>
                  <div className="-mr-2">
                    {location.pathname !== "/restaurant/items-list" && (
                      <button className="relative mx-4">
                        <Link className="font-bold" to="/checkout">
                          {cart?.length > 0 && (
                            <div>
                              <span className="animate-ping absolute top-0 right-0 -mt-2 -mr-2 inline-flex items-center justify-center h-5 w-5 rounded-full bg-red-500 text-white text-xs font-medium"></span>
                              <span className="absolute top-0 right-0 -mt-2 -mr-2 inline-flex items-center justify-center h-5 w-5 rounded-full bg-red-500 text-white text-xs font-medium">
                                {cart?.length}
                              </span>
                            </div>
                          )}
                        </Link>
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={toggleMenu}
                      className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                    >
                      <span className="sr-only">Close menu</span>
                      <X className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                </div>
                {location.pathname !== "/restaurant/items-list" ? (
                  <button
                    onClick={openDrawer}
                    className="mt-4 w-full rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                  >
                    Open Drawer
                  </button>
                ) : (
                  <button
                    type="button"
                    className="mt-4 w-full rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                    onClick={logoutClicked}
                  >
                    Logout
                  </button>
                )}
                <DrawerComp isOpen={isDrawerOpen} onClose={closeDrawer} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
