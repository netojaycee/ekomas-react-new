import React from "react";
import AdminSidebar from "./SideBar";
import AdminNav from "./Header";
import AdminFooter from "./Footer";
import { UserSidebar } from "./user_sidebar";
import SpecialLayout from "../SpecialLayout";

const UserLayout = ({ children }) => {
  return (
    <>
      <SpecialLayout>
        <div className="flex flex-col lg:flex-row w-[90%]  h-[calc(100vh)] my-10 mx-auto md:p-40 gap-4 ">

          <div className="w-full lg:w-[30%] h-full ">
            <UserSidebar />
          </div>

          <div className='flex w-full lg:w-[70%] h-full overflow-y-auto rounded-md mx-auto items-center bg-[#f8f8f8] gap-6'>
            {children}
          </div>
        </div>

      </SpecialLayout>

    </>
  );
};

export default UserLayout;

{/* <SpecialLayout>
  <div className="flex w-[90%] mx-auto md:p-40 gap-4 ">

    <div className="w-[30%]">
      <UserSidebar />
    </div>

    <div className='flex w-[70%] mx-auto h-screen bg-white items-center bg-[#f8f8f8] gap-6'>
      {children}
      <div className='flex-col flex  w-full h-[90%] p-4'>
            <div>
              <h2>Account Overview</h2>
            </div>
            <hr className='w-full' />
            <div></div>
          </div>
    </div>
  </div>

</SpecialLayout> */}
