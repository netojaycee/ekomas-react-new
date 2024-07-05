import { useNavigate, useLocation } from "react-router-dom";

const getToken = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const storedUser = JSON.parse(localStorage.getItem("user"));

  if (storedUser) {
    const { token, timestamp } = storedUser;
    const expiryTime = 5 * 60 * 60 * 1000; // 5 hours in milliseconds
    const currentTime = new Date().getTime();

    if (currentTime - timestamp > expiryTime) {
      localStorage.removeItem("user");
      navigate("/login", { state: { from: location } });
      return null;
    }

    return token;
  }

  navigate("/login", { state: { from: location } });
  return null;
};

export default getToken;
