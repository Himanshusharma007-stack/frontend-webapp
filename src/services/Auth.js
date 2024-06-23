import axios from "axios";
import localStorageFunctions from '../utils/localStorageFunctions.js'

// const API_BASE_URL = "https://backend-webapp-inky.vercel.app";
const API_BASE_URL = "http://localhost:3000";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "token": localStorageFunctions.getDatafromLocalstorage('token')
  },
});

// Function to get the list of restaurants
export const isUserAuthenticated = async () => {
  try {
    console.log(`localStorageFunctions.getDatafromLocalstorage('token') --- `,localStorageFunctions.getDatafromLocalstorage('token'));
    const response = await apiClient.get("/authenticate");
    return response.data;
  } catch (error) {
    console.error("Error checking user authentication:", error);
    throw error.response.data;
  }
};

export default apiClient;
