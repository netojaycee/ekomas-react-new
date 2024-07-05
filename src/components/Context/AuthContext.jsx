import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiUrl } from "../../config/env";

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
      const storedUser = JSON.parse(localStorage.getItem("user"));
        const token = storedUser.token;
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      const response = await axios.get(`${apiUrl}/auth/all-user`, { headers });
      // console.log(response);
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
