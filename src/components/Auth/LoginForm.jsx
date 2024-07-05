import { Input, Spinner } from "@material-tailwind/react";
import React, { useContext, useState } from "react";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { apiUrl } from "../../config/env";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import AuthContext from "../Context/AuthContext";

const LoginForm = () => {
  const navigate = useNavigate();
  const { setAuth } = useContext(AuthContext);
  const [errors, setErrors] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "email" ? value.toLowerCase() : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Set loading to true when form is submitted

    // Clear previous errors
    setErrors("");

    try {
      const response = await axios.post(`${apiUrl}/auth/sign-in`, formData);

      // console.log(response);
      if (response.statusText === "OK") {
        const { token } = response.data;
        setIsLoading(false);

        const currentTime = new Date().getTime();
        const tokenData = { token, timestamp: currentTime };
        localStorage.setItem("user", JSON.stringify(tokenData));

        const decodedToken = jwtDecode(token);
        const { email, name, userId, role } = decodedToken;

        setAuth({
          user: {
            email,
            name,
            userId,
            role,
          },
        });
        setFormData({
          email: "",
          password: "",
        });

        toast.success("Login successful");

        // Check user roles
        if (role === "admin") {
          // If user is an admin, navigate to admin/dashboard
          setIsLoading(false);
          const redirectPath =
            location.state?.from?.pathname || "/admin/dashboard";
          navigate(redirectPath);
        } else {
          // If user is a regular user, navigate to user/dashboard
          setIsLoading(false);
          const redirectPath =
            location.state?.from?.pathname || "/user/dashboard";
          navigate(redirectPath);
        }
      }
    } catch (error) {
      setErrors(error.response.data.error || error.response.data.message);
      setIsLoading(false);
      // console.error("Error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      {errors && <p className="text-red-500 text-sm">{errors}</p>}

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
      </div>
      <div>
        <Input
          size="md"
          label="Password"
          value={formData.password}
          onChange={handleChange}
          type="password" // Use secure text entry for passwords
          className="rounded-none"
          name="password"
          required
        />
      </div>
      <div className="flex flex-row justify-between">
        <label>
          <input type="checkbox" className="m-1" />
          Remember me
        </label>
        <Link to="/forgot-password" className="text-secondary">
          forgot password?
        </Link>
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
            Sign in
            <ArrowRightIcon className="ml-1 w-6" />
          </button>
        )}
      </div>
    </form>
  );
};

export default LoginForm;
