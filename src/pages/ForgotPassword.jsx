import React, { useState } from "react";
import { apiUrl } from "../config/env";
import { toast } from "react-toastify";
import axios from "axios";
import { Input, Spinner } from "@material-tailwind/react";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
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
          email: "",
        });

        toast.success("email verification link sent!");
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
        <h2 className="text-center text-xl font-bold">Reset Your Password</h2>
        <p className="text-center">We will send you an email to reset your password</p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div>
            <Input
              size="md"
              label="Email Address"
              value={formData.email}
              onChange={handleChange}
              type="email"
              className="rounded-none"
              name="email"
              required
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
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
                Send Reset Link
                <ArrowRightIcon className="ml-1 w-6" />
              </button>
            )}
            <Link
              to="/login"
              className="flex flex-row text-primary mt-2 justify-center py-2 px-10 bg-white rounded-sm w-full duration-300 transform hover:scale-95  transition ease-linear"
            >
              cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
