import { Input, Spinner } from "@material-tailwind/react";
import React, { useState } from "react";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { apiUrl } from "../../config/env";
import { toast } from "react-toastify";

export default function Register() {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ... (previous code)

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log('Submitting:', formData);

    // Clear previous errors
    setIsLoading(true);
    setErrors({});

    try {
      // Perform Axios request here
      const response = await axios.post(`${apiUrl}/auth/create`, formData);
      // console.log(response.data);
      console.log(response);
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
      setErrors(error.response.data.errors);
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
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
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>
        {/* <div>
          <Input
            size="md"
            label="Last name"
            className='rounded-none'
            name="last_name"
            type='text'
            value={formData.last_name}
            onChange={handleChange}
          />
          {errors.last_name && <p className='text-red-500 text-sm'>{errors.last_name}</p>}
        </div> */}
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
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}
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
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password}</p>
          )}
        </div>
        {/* <div>
          <Input
            size="md"
            label="Confirm Password"
            className='rounded-none'
            name="confirm_password"
            type='password'
            value={formData.confirm_password}
            onChange={handleChange}
          />
          {errors.confirm_password && <p className='text-red-500 text-sm'>{errors.confirm_password}</p>}
        </div> */}

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
