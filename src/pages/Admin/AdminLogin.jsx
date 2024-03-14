import React from "react";
import AdminLoginForm from "../../components/Auth/AdminLoginForm";
import SpecialLayout from "../../components/SpecialLayout";

export default function AdminLogin() {
  return (
    <SpecialLayout>
      <div className="flex flex-col w-[30%] mx-auto justify-center h-screen">
        <AdminLoginForm />
      </div>
    </SpecialLayout>
  );
}
