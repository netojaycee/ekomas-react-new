import { Outlet } from "react-router-dom";
import { useContext, useEffect } from "react";
import Loader from "../Loader";
import useRefreshToken from "./useRefreshToken";
import AuthContext from "../Context/AuthContext";
import { useLoading } from "../Context/LoadingContext";

const PersistLogin = () => {
  const { isLoading, setIsLoading } = useLoading();
  const refresh = useRefreshToken();
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        setIsLoading(true);
        await refresh();
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    if (!auth?.user) {
      verifyRefreshToken();
    } else {
      setIsLoading(false);
    }
  }, []);

  return <>{isLoading ? <Loader /> : <Outlet />}</>;
};

export default PersistLogin;
