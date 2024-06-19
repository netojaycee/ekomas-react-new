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
        <div className="overflow-x-hidden font-serif bg-tsp_background">
          <Nav />
          <div className="min-h-screen">
            <Outlet />
          </div>
          <Footer fullFooter={true} />
        </div>
      )}
    </>
  );
};

export default SiteLayout;
