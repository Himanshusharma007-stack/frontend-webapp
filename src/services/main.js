import axios from "axios";

// const API_BASE_URL = "https://backend-webapp-inky.vercel.app";
const API_BASE_URL = import.meta.env.VITE_BACKEND_DOMAIN_URL;

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;