import React from "react";
import { UserSidebar } from "./user_sidebar";
import { Outlet } from "react-router-dom";
import Loader from "../Loader";
import { useLoading } from "../Context/LoadingContext";

const UserLayout = () => {
  const { isLoading } = useLoading();

  return (
    <>
     {isLoading ? (
        <Loader  />
      ) : (
        
        // <div className="min-h-screen overflow-hidden bg-gray-200">
        //   <Nav />
        //   <Outlet />
        //   <Footer fullFooter={false} />
        // </div>
        <div className="flex flex-col lg:flex-row w-[90%]  h-[calc(100vh)] my-10 mx-auto md:p-40 gap-4 ">

          <div className="w-full lg:w-[30%] h-full ">
            <UserSidebar />
          </div>

          <div className='flex w-full lg:w-[70%] h-full overflow-y-auto rounded-md mx-auto items-center bg-[#f8f8f8] gap-6'>
            <Outlet />
          </div>
        </div>
      )}

    </>
  );
};

export default UserLayout;
