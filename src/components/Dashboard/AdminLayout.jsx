import React from "react";
import AdminSidebar from "./SideBar";
import AdminNav from "./Header";
import AdminFooter from "./Footer";

const AdminLayout = ({ children }) => {
  return (
    <>
      <div className="">
      <AdminNav />
<div className="flex flex-row h-screen gap-6">
<AdminSidebar />



<main className="flex-1  bg-gray-200 h-full w-[80%] overflow-scroll mb-7">
            {children}
          </main>


    </div>

      <AdminFooter />
</div>
       
    </>
  );
};

export default AdminLayout;
