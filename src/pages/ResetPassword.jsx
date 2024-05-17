import React, { useState } from "react";
import { apiUrl } from "../config/env";
import { toast } from "react-toastify";
import axios from "axios";
import { Input, Spinner } from "@material-tailwind/react";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

export default function ResetPassword() {
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post(`${apiUrl}/auth/sign-in`, formData);

      // console.log(response);
      if (response.statusText === "OK") {
        setIsLoading(false);

        setFormData({
          password: "",
          confirmPassword: "",
        });

        toast.success("password reset successful!");
      } else {
        // Handle unsuccessful sign-in
        console.error(
          "failed to send verification link",
          response.data.message
        );
      }
    } catch (error) {
      // setErrors(error); // Assuming your backend returns errors in this format
      setIsLoading(false);
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex flex-col bg-gray-300 w-full mx-auto justify-center p-10">
      <div className="flex flex-col gap-3 bg-white md:w-[500px] w-[90%] mx-auto p-5 rounded-md shadow-md">
        <h2 className="text-center text-xl font-bold">Reset Password</h2>
        {/* <p className="text-center">We will send you an password to reset your password</p> */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div>
            <Input
              size="md"
              label="password"
              value={formData.password}
              onChange={handleChange}
              type="password"
              className="rounded-none"
              name="password"
              required
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}
          </div>
          <div>
            <Input
              size="md"
              label="confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              type="password"
              className="rounded-none"
              name="confirmPassword"
              required
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
            )}
          </div>
          <div>
            {isLoading ? (
              <div className="flex flex-row text-white justify-center py-2 px-10 bg-secondary rounded-sm w-full  duration-300 transform hover:scale-95 hover:bg-red-500 transition ease-linear">
                <Spinner className="h-4 w-4" />
              </div>
            ) : (
              <button
                type="submit"
                className="flex flex-row text-white justify-center py-2 px-10 bg-secondary rounded-sm w-full  duration-300 transform hover:scale-95 hover:bg-red-500 transition ease-linear"
              >
               update password
                <ArrowRightIcon className="ml-1 w-6" />
              </button>
            )}
            
          </div>
        </form>
      </div>
    </div>
  );
}
