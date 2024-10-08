import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../config/axiosInstance";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [users, setUsers] = useState([]);

  const navigate = useNavigate();

  const logout = () => {
    try {
      // axios.post("/log-out");
      localStorage.removeItem("user");
      navigate("/");
      setAuth({});
    } catch (err) {
      console.err(err);
    }
  };

  const fetchUsers = async () => {
    try {
      
      const response = await axiosInstance.get("/auth/all-user");
      if (response.status === 200) {
        const users = response.data.user;
        setUsers(users);
        // console.log(users);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };
  // Fetch blogs from the backend endpoint
  useEffect(() => {
    fetchUsers();
  }, []); // The empty dependency array ensures that this effect runs only once when the component mounts

  return (
    <AuthContext.Provider value={{ auth, setAuth, logout, fetchUsers, users }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
