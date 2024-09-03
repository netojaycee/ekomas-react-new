import axios from "axios";
import { apiUrl } from "./env";
import { Navigate } from "react-router-dom";
// import { useNavigate } from "react-router-dom";

const axiosInstance = axios.create({
  baseURL: apiUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const token = storedUser?.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    // console.log("Response:", response);
    return response;
  },
  (error) => {
    // console.log("Error:", error);
    if (error.response?.data?.message === "jwt expired") {
      localStorage.removeItem("user");
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
