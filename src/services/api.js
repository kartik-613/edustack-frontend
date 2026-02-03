import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000/api", // replace with your backend URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Optional: Add auth token automatically
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default API;
