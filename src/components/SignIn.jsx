import React from "react";
import { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { loginRestaurant } from "../services/Restaurants";
import { createRestaurant } from "../services/Restaurants";
import Notification from "../components/Notification";
import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";
import localStorageFunctions from "../utils/localStorageFunctions.js";
import { isUserAuthenticated } from "../services/Auth";

export default function SignIn() {
  const [alreadyUser, setAlreadyUser] = useState(true);
  const [userid, setUserid] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState(null);
  const [loadingLogin, setLoadingLogin] = useState(false);
  const [loadingSignup, setLoadingSignup] = useState(false);
  const [storeName, setStoreName] = useState("");
  const [storeAddress, setStoreAddress] = useState("");
  const [storeMobile, setStoreMobile] = useState("");
  const [storeEmail, setStoreEmail] = useState("");
  const [storePassword, setStorePassword] = useState("");
  const [notificationmsg, setNotificationmsg] = useState(null);
  const navigate = useNavigate();
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorageFunctions.getDatafromLocalstorage("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []); // Run once on mount to get the token

  const updateUserState = () => {
    setAlreadyUser((prevState) => !prevState);
  };

  function resetFormData() {
    setUserid("");
    setPassword("");
    setErrorMsg(null);
    setStoreName("");
    setStoreAddress("");
    setStoreMobile("");
    setStoreEmail("");
    setStorePassword("");
  }

  async function HandleLogIn() {
    try {
      setLoadingLogin(true);
      let res = await loginRestaurant({ restaurantId: userid, password });
      console.log("res ------- ", res);
      if (res.success) {
        localStorageFunctions.saveInLocalstorage("token", res.token);
        localStorageFunctions.saveInLocalstorage("data", res.data);
        console.log("Login successfully");
        setNotificationmsg("Login successfully.");
        if (res.data) {
          navigate("/restaurant/items-list", { state: { data: res.data } });
        }
        resetFormData();
      } else {
        setErrorMsg(res.message || "Login failed. Please try again.");
      }
    } catch (error) {
      console.log("error ---- ", error.message);
      setErrorMsg(error.message || "An error occurred during login.");
    } finally {
      setLoadingLogin(false);
      setTimeout(() => {
        setErrorMsg(null);
        setNotificationmsg(null);
      }, 2000);
    }
  }

  async function HandleSignUp() {
    try {
      setLoadingSignup(true);
      let res = await createRestaurant({
        name: storeName,
        address: storeAddress,
        mobile: storeMobile,
        email: storeEmail,
        password: storePassword,
      });

      if (res.success) {
        setAlreadyUser(true);
        resetFormData();
        setNotificationmsg("Restaurant created successfully.");
      }
    } catch (error) {
      console.log("Error ---- ", error.message);
      setErrorMsg(error.message);
      throw new Error(error);
    } finally {
      setLoadingSignup(false);
      setTimeout(() => {
        setErrorMsg(null);
        setNotificationmsg(null);
      }, 2000);
    }
  }

  function redirectToRestaurantList() {
    navigate("/restaurant/items-list");
  }

  function redirectToLogin() {
    navigate("/restaurant/login-or-signup");
    localStorageFunctions.removeDatafromLocalstorage("token");
    localStorageFunctions.removeDatafromLocalstorage("data");
  }

  async function checkUserIsAuthenticated() {
    try {
      let res = await isUserAuthenticated();
      if (res.success) redirectToRestaurantList();
    } catch (error) {
      console.log("error --------------- ", error);
      redirectToLogin();
    }
  }

  useEffect(() => {
    checkUserIsAuthenticated();
  }, []);

  return (
    <section>
      {notificationmsg && (
        <Notification
          msg={notificationmsg}
          close={() => setNotificationmsg(null)}
        />
      )}
      {alreadyUser ? (
        // Login form
        <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
          <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
            <h2 className="text-center text-2xl font-bold leading-tight text-black">
              Log in to your account
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600 ">
              Don&apos;t have an account?{" "}
              <button
                onClick={updateUserState}
                value={alreadyUser}
                title=""
                className="font-semibold text-black transition-all duration-200 hover:underline"
              >
                Create a Business Account
              </button>
            </p>
            <form action="#" method="POST" className="mt-8">
              <div className="space-y-5">
                <div>
                  <label
                    htmlFor=""
                    className="text-base font-medium text-gray-900"
                  >
                    {" "}
                    Userid{" "}
                  </label>
                  <div className="mt-2">
                    <input
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="text"
                      placeholder="Enter your unique userid"
                      onChange={(e) => setUserid(e.target.value)}
                      value={userid}
                    ></input>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor=""
                      className="text-base font-medium text-gray-900"
                    >
                      {" "}
                      Password{" "}
                    </label>
                    {/* <a href="#" title="" className="text-sm font-semibold text-black hover:underline">
                    {' '}
                    Forgot password?{' '}
                  </a> */}
                  </div>
                  <div className="mt-2">
                    <input
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="text"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    ></input>
                  </div>
                </div>
                <div>
                  <button
                    type="button"
                    className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                    onClick={() => HandleLogIn()}
                  >
                    {loadingLogin ? (
                      <Spinner />
                    ) : (
                      <>
                        Get started <ArrowRight className="ml-2" size={16} />
                      </>
                    )}
                  </button>

                  {errorMsg && (
                    <Notification
                      msg={errorMsg}
                      error={true}
                      close={() => setErrorMsg(null)}
                    />
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
          <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
            <h2 className="text-center text-2xl font-bold leading-tight text-black">
              Signup to your Business
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600 ">
              Already have an account?{" "}
              <button
                onClick={updateUserState}
                value={alreadyUser}
                title=""
                className="font-semibold text-black transition-all duration-200 hover:underline"
              >
                Login to your business
              </button>
            </p>
            <form action="#" method="POST" className="mt-8">
              <div className="space-y-5">
                {/* Signup form */}
                <div>
                  <label
                    htmlFor=""
                    className="text-base font-medium text-gray-900"
                  >
                    {" "}
                    Store name{" "}
                  </label>
                  <div className="mt-2">
                    <input
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="text"
                      placeholder="Example: Sam's Pizza"
                      onChange={(e) => setStoreName(e.target.value)}
                      value={storeName}
                    ></input>
                  </div>
                </div>
                <div>
                  <label
                    htmlFor=""
                    className="text-base font-medium text-gray-900"
                  >
                    {" "}
                    Store address{" "}
                  </label>
                  <div className="mt-2">
                    <input
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="text"
                      placeholder="Enter your address here"
                      onChange={(e) => setStoreAddress(e.target.value)}
                      value={storeAddress}
                    ></input>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor=""
                      className="text-base font-medium text-gray-900"
                    >
                      {" "}
                      Mobile{" "}
                    </label>
                  </div>
                  <div className="mt-2">
                    <input
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="text"
                      placeholder="Example: 10 digits only (+91 not allowed)"
                      onChange={(e) => setStoreMobile(e.target.value)}
                      value={storeMobile}
                    ></input>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor=""
                      className="text-base font-medium text-gray-900"
                    >
                      {" "}
                      Email{" "}
                    </label>
                  </div>
                  <div className="mt-2">
                    <input
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="text"
                      onChange={(e) => setStoreEmail(e.target.value)}
                      value={storeEmail}
                    ></input>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor=""
                      className="text-base font-medium text-gray-900"
                    >
                      {" "}
                      Password{" "}
                    </label>
                  </div>
                  <div className="mt-2">
                    <input
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="text"
                      placeholder="Contain a small / capital letter and no."
                      onChange={(e) => setStorePassword(e.target.value)}
                      value={storePassword}
                    ></input>
                  </div>
                </div>
                <div>
                  <button
                    type="button"
                    className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                    onClick={() => HandleSignUp()}
                  >
                    {loadingSignup ? <Spinner /> : <>Sign up</>}
                  </button>

                  {errorMsg && (
                    <Notification
                      msg={errorMsg}
                      error={true}
                      close={() => setErrorMsg(null)}
                    />
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
