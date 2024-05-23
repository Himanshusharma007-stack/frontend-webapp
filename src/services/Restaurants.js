import axios from "axios";

const API_BASE_URL = "https://backend-webapp-inky.vercel.app";

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
    throw error;
  }
};

export const getRestaurantsMenuById = async (id) => {
  try {
    const response = await apiClient.get(`/restaurantMenu/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching restaurants:", error);
    throw error;
  }
};

export default apiClient;
