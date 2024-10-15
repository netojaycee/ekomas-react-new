// Layout.js
import React from "react";
import Nav from "./Navbar";
import Footer from "./Footer";
import Loader from "./Loader";
import { Outlet } from "react-router-dom";
import { useLoading } from "./Context/LoadingContext";

const SiteLayout = () => {
  const { isLoading } = useLoading();

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="overflow-x-hidden font-inter bg-gray-200 min-h-screen flex flex-col">
          <Nav />
          <div className="flex-grow">
            <Outlet />
          </div>
          <Footer fullFooter={false} />
        </div>
      )}
    </>
  );
};

export default SiteLayout;
