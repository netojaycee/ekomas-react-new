import React from "react";
import AdminSidebar from "./SideBar";
import AdminNav from "./Header";
import AdminFooter from "./Footer";
import { Outlet } from "react-router-dom";
import { useLoading } from "../Context/LoadingContext";
import Loader from "../Loader";

const AdminLayout = () => {
  const { isLoading } = useLoading();

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="">
          <AdminNav />
          <div className="flex flex-row h-screen gap-6">
            <AdminSidebar />

            <main className="flex-1  bg-gray-200 h-full w-[80%] overflow-scroll mb-7">
              <Outlet />
            </main>
          </div>

          <AdminFooter />
        </div>
      )}
    </>
  );
};

export default AdminLayout;
