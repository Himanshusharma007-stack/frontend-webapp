import axios from "axios";
import localStorageFunctions from "../utils/localStorageFunctions.js";

// const API_BASE_URL = "https://backend-webapp-inky.vercel.app";
const API_BASE_URL = import.meta.env.VITE_BACKEND_DOMAIN_URL;

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorageFunctions.getDatafromLocalstorage("token");
    if (token) {
      config.headers["token"] = `${token}`; // Use Bearer token format if applicable
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Function to get the list of restaurants
export const isUserAuthenticated = async () => {
  try {
    const response = await apiClient.get("/authenticate");
    return response.data;
  } catch (error) {
    console.error("Error checking user authentication:", error);
    throw error.response.data;
  }
};

export default apiClient;
