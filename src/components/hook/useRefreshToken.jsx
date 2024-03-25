import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import AuthContext from "../Context/AuthContext";

const useRefreshToken = () => {
  const { setAuth } = useContext(AuthContext);
  const location = useLocation();

  const refresh = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const decodedToken = jwtDecode(storedUser);
    const { email, userId, role, name } = decodedToken;

    if (!storedUser) {
      setAuth({});
      return <Navigate to="/" state={{ from: location }} replace />;
    }

    setAuth((prev) => ({
      ...prev,
      user: {
        email,
        userId,
        role,
        name,
      },
    }));

    return storedUser;
  };

  return refresh;
};

export default useRefreshToken;
