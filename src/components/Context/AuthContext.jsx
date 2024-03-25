import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const navigate = useNavigate();

  const logout = () => {
    try {
      // axios.post("/log-out");
      localStorage.removeItem("user");
      navigate('/');
      setAuth({});
    } catch (err) {
      console.err(err);
    }
  };

  return (
    <AuthContext.Provider value={{ auth, setAuth, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
