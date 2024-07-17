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
export const createOrder = async ({ orderId, paymentId, userId, amount, name, mobile, orderData }) => {
  try {
    const response = await apiClient.post("/order/create", { orderId, paymentId, userId, amount, name, mobile, orderData });
    return response.data;
  } catch (error) {
    console.error("Error fetching restaurants:", error);
    throw error.response.data;
  }
};

export default apiClient;
