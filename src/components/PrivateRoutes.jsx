import React from 'react'
import { getUser, isUserAuthenticated } from '../Services/AuthServices'
import { Link, Navigate, Outlet } from 'react-router-dom';

const PrivateRoutes = (props) => {
    const auth = isUserAuthenticated('sessionToken');
  return auth? <Outlet />: <div>Please log in <Navigate to="/login"></Navigate></div>
}

export default PrivateRoutes