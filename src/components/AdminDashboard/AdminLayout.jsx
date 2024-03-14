import React from "react";
import AdminSidebar from "./SideBar";
import AdminNav from "./Header";
import AdminFooter from "./Footer";

const AdminLayout = ({ children }) => {
  return (
    <>
      <div className="overflow-hidden">
      <AdminNav />
<div className="flex flex-row h-screen gap-6 ">
<AdminSidebar />



<main className="flex-1  bg-gray-200 h-full w-[80%]">
            {children}
          </main>


    </div>

      <AdminFooter />
</div>
       
    </>
  );
};

export default AdminLayout;
