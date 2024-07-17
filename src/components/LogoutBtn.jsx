import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import localStorageFunctions from "../utils/localStorageFunctions.js";

const LogoutButton = () => {
  const { logout } = useAuth0();

  function handleLogout() {
    logout({
      logoutParams: {
        returnTo:
          import.meta.env.VITE_AUTH_LOGOUT_URL ||
          "https://himanshusharma007-stack.github.io/food-webapp/",
      },
    });
    localStorageFunctions.removeDatafromLocalstorage("userId");
  }

  return (
    <button
      className="block w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
      onClick={() => handleLogout()}
    >
      Log Out
    </button>
  );
};

export default LogoutButton;
