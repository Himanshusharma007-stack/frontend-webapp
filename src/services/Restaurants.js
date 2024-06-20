import axios from "axios";

// const API_BASE_URL = "https://backend-webapp-inky.vercel.app";
const API_BASE_URL = "http://localhost:3000";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Function to get the list of restaurants
export const getRestaurants = async () => {
  try {
    const response = await apiClient.get("/restaurant");
    return response.data;
  } catch (error) {
    console.error("Error fetching restaurants:", error);
    throw error.response.data;
  }
};

// Function to get the list of restaurant's menu
export const getRestaurantsMenuById = async (id) => {
  try {
    const response = await apiClient.get(`/restaurant/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching restaurants:", error);
    throw error.response.data;
  }
};

// Function to Signup restaurant
export const signupRestaurant = async ({ restaurantId, password }) => {
  try {
    const response = await apiClient.post("/restaurant/signup", { restaurantId, password });
    return response.data;
  } catch (error) {
    console.error("Error fetching restaurants:", error);
    throw error.response.data;
  }
};

// Function to login restaurant
export const loginRestaurant = async ({ restaurantId, password }) => {
  try {
    const response = await apiClient.post("/restaurant/login", { restaurantId, password });
    return response.data;
  } catch (error) {
    console.error("Error fetching restaurants:", error);
    throw error.response.data;
  }
};

// Function to get the list of restaurants
export const createRestaurant = async (obj) => {
  try {
    const response = await apiClient.post("/restaurant/create", obj);
    return response.data;
  } catch (error) {
    console.error("Error fetching restaurants:", error);
    throw error.response.data;
  }
};

export default apiClient;
