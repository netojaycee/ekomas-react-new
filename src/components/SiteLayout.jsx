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
        <div className="overflow-x-hidden font-serif bg-white min-h-screen flex flex-col">
          <Nav />
          <div className="flex-grow">
            <Outlet />
          </div>
          <Footer fullFooter={true} />
        </div>
      )}
    </>
  );
};

export default SiteLayout;
