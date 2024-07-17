import axios from "axios";

// const API_BASE_URL = "https://backend-webapp-inky.vercel.app";
const API_BASE_URL = "http://localhost:3000";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Function to create user
export const createUser = async (obj) => {
  try {
    const response = await apiClient.post("/user/createUser", obj);
    return response.data;
  } catch (error) {
    console.error("Error while creating user:", error);
    throw error.response.data;
  }
};

export const getUserById = async (id) => {
  try {
    const response = await apiClient.get(`/user/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error while find user by id:", error);
    throw error.response.data;
  }
};

export default apiClient;
