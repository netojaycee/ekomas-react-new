import axios from "axios";
import Cookies from "js-cookie";
import { BrowserRouter } from "react-router-dom";
import { apiUrl } from "../config/env";

export const setUserSession = (user, token) => {
  localStorage.setItem("user", JSON.stringify(user));
  localStorage.setItem("token", token);
};

export const getUser = () => {
  const user = localStorage.getItem("user");
  if (user === "undefined" || !user) {
    return null;
  } else {
    return JSON.parse(user);
  }
};

export const isUserAuthenticated = (key) => {
  const token = Cookies.get(key);
  return !!token;
};

export const logoutUser = (key) => {
  Cookies.remove(key);
};

export const logout = async () => {
  try {
    // Make a request to your logout endpoint
    await axios.post(`${apiUrl}/v1/auth/logout`);

    // Clear the authentication token from local storage
    Cookies.remove('token');

    // Redirect to the login page or any other page
    window.location.replace('/login');
  } catch (error) {
    console.error('Logout failed', error);
    // Handle logout failure (show error message, etc.)
  }
};

export const setupAxiosInterceptors = () => {
  // Add a request interceptor to include the authentication token in the request header
  axios.interceptors.request.use(
    (config) => {
      const token = Cookies.get('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Add a response interceptor to handle unauthorized responses
  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response && error.response.status === 401) {
        // Logout the user if the server responds with unauthorized status
        logout();
      }
      return Promise.reject(error);
    }
  );
};



export const getToken = () => {
  return localStorage.getItem("token");
};

export const resetUserSession = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
};

export const setCookie = (key, value) => {
	Cookies.set(key, value, { expires: 7});
}
export const getCookie = (key) => {
	return Cookies.get(key)
}

export const removeCookie = (key) => {
	if (BrowserRouter) {
		Cookies.remove(key)
	}
}
  