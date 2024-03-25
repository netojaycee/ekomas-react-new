import { useContext, useEffect, useState } from "react";
import { useLocation, Outlet, Navigate } from "react-router-dom";
import { useLoading } from "../Context/LoadingContext";
import AuthContext from "../Context/AuthContext";


const RequireAuth = ({ allowedRoles }) => {
  const { auth } = useContext(AuthContext);
  const location = useLocation();
  const {isLoading, setIsLoading} = useLoading();

  // useEffect(() => {
  //   console.log(allowedRoles)
  //   console.log(auth?.user?.role)
  // }, []);

  if (isLoading) {
    // Return null during the loading period
    return;
  } else if (allowedRoles.includes(auth?.user?.role)) {
    // If the user has one of the allowed roles, render the child routes
    return <Outlet />;
  } else if (auth?.user) {
    // If the user is logged in but doesn't have the required role, navigate to unauthorized page
    return <Navigate to="/unauthorized" state={{ from: location }} replace />;
  } else {
    // If the user is not logged in, navigate to action page
    return <Navigate to="/" state={{ from: location }} replace />;
  }
};

export default RequireAuth;
