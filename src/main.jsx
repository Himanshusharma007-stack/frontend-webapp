import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { store } from "./app/store";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Homepage from "./pages/Home.jsx";
import ErrorPage from "./pages/Error.jsx";
import Base from "./pages/Base.jsx";
import RestoMenu from "./pages/RestoMenu.jsx";
import Checkout from "./pages/Checkout.jsx";
import SignInPage from "./pages/SignIn.jsx";

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
        path: 'restaurant/login-or-signup',
        element: <SignInPage />
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
