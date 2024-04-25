import React from "react";
import { UserSidebar } from "./user_sidebar";
import { Outlet } from "react-router-dom";
import Loader from "../Loader";
import { useLoading } from "../Context/LoadingContext";
import Nav from "../Navbar";
import Footer from "../Footer";

const UserLayout = () => {
  const { isLoading } = useLoading();

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        // <div className="min-h-screen overflow-hidden bg-gray-200">
        //   <Outlet />
        // </div>
        <>
          {" "}
          <Nav />
          <div className="flex flex-col lg:flex-row w-full border shadow-md mx-auto md:py-7 gap-4 ">
            <div className="w-full lg:w-[30%] h-full ">
              <UserSidebar />
            </div>

            <div className="flex w-full h-full overflow-y-auto rounded-md mx-auto items-center bg-[#f8f8f8] gap-6">
              <Outlet />
            </div>
          </div>
          <Footer fullFooter={false} />
        </>
      )}
    </>
  );
};

export default UserLayout;
