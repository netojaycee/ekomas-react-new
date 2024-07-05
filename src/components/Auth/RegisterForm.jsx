import { Input, Spinner } from "@material-tailwind/react";
import React, { useState } from "react";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { apiUrl } from "../../config/env";
import { toast } from "react-toastify";

export default function Register() {
  const navigate = useNavigate();
  const [errors, setErrors] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "email" ? value.toLowerCase() : value,
    });
  };

  // ... (previous code)

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    setErrors("");
    if (formData.password !== formData.confirm_password) {
      setErrors("Passwords do not match");
      setIsLoading(false);
      return;
    }

    try {
      // Perform Axios request here
      const response = await axios.post(`${apiUrl}/auth/create`, formData);
    
      if (response.statusText === "OK") {
        // Redirect or handle success as needed
        setIsLoading(false);
        toast.success("Registration Successful");
        // setTimeout(() => {
        //   navigate("/login"); // Redirect to login page
        // }, 3000);
        navigate("/login"); // Redirect to login page
      } else {
        return;
      }
    } catch (error) {
      setIsLoading(false);
      setErrors(error.response.data.error || error.response.data.message);
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        {errors && <p className="text-red-500 text-sm">{errors}</p>}

        <div>
          <Input
            size="md"
            label="Full name"
            className="rounded-none focus:outline-none focus:ring-0"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <Input
            size="md"
            label="Email"
            className="rounded-none"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <Input
            size="md"
            label="Password"
            className="rounded-none"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <Input
            size="md"
            label="Confirm Password"
            className="rounded-none"
            name="confirm_password"
            type="password"
            value={formData.confirm_password}
            onChange={handleChange}
          />
        </div>

        <div>
          {isLoading && (
            <div className="flex flex-row text-white justify-center py-2 px-10 bg-secondary rounded-sm w-full  duration-300 transform hover:scale-95 hover:bg-red-500 transition ease-linear">
              <Spinner className="h-4 w-4" />
            </div>
          )}
          {!isLoading && (
            <button
              type="submit"
              className="flex flex-row text-white justify-center py-2 px-10 bg-secondary rounded-sm w-full  duration-300 transform hover:scale-95 hover:bg-red-500 transition ease-linear"
            >
              Register
              <ArrowRightIcon className="ml-1 w-6" />
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
