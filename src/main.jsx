import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./theme.css";
import { store } from "./app/store";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Homepage from "./pages/Home.jsx";
import ErrorPage from "./pages/Error.jsx";
import Base from "./pages/Base.jsx";
import RestoMenu from "./pages/RestoMenu.jsx";
import Checkout from "./pages/Checkout.jsx";
import SignInPage from "./pages/SignIn.jsx";
// import RestaurantItems from "./pages/restaurantItems.jsx";
import RestaurantItems from "./pages/RestaurantItems.jsx";
import { ThemeProvider } from "@material-tailwind/react";
import { LoginSignupUser } from "./pages/LoginSignupUser.jsx";
import { Orders } from "./pages/Orders.jsx";
import { Auth0Provider } from "@auth0/auth0-react";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Base />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <Homepage />,
      },
      {
        path: "restaurant/:id",
        element: <RestoMenu />,
      },
      {
        path: "checkout",
        element: <Checkout />,
      },
      {
        path: "restaurant/login-or-signup",
        element: <SignInPage />,
      },
      {
        path: "restaurant/items-list",
        element: <RestaurantItems />,
      },
      {
        path: "user/login-or-signup",
        element: <LoginSignupUser />,
      },
      {
        path: "myorders",
        element: <Orders />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Auth0Provider
      domain={
        import.meta.env.VITE_AUTH_DOMAIN || "dev-xehmosrod5wqrpnk.us.auth0.com"
      }
      clientId={
        import.meta.env.VITE_AUTH_CLIENTID || "lPKaDSHQN0JKfeoVT44wckEk8qDnbxjG"
      }
      authorizationParams={{
        redirect_uri:
          import.meta.env.VITE_AUTH_LOGIN_URL ||
          "https://himanshusharma007-stack.github.io/food-webapp/",
      }}
    >
      <ThemeProvider>
        <Provider store={store}>
          <RouterProvider router={router} />
        </Provider>
      </ThemeProvider>
    </Auth0Provider>
  </React.StrictMode>
);
