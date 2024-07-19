// import apiService from './main'
import axios from "axios";

// const API_BASE_URL = "https://backend-webapp-inky.vercel.app";
const API_BASE_URL = "http://localhost:3000";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const imageApiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

// Function to create foodItem
export const createFoodItem = async (obj) => {
  try {
    const response = await imageApiClient.post("/foodItem/create", obj);
    return response.data;
  } catch (error) {
    console.error("Error fetching restaurants:", error);
    throw error.response.data;
  }
};

export const updateFoodItem = async (obj) => {
  try {
    const response = await imageApiClient.post("/foodItem/update", obj);
    return response.data;
  } catch (error) {
    console.error("Error fetching restaurants:", error);
    throw error.response.data;
  }
};

export const getCategories = async () => {
  try {
    const {data} = await apiClient.get('/foodItem/categories')
    return data || []
  } catch (error) {
    console.error("Error fetching restaurants:", error);
    throw error.response.data;
  }
}

export default apiClient;
