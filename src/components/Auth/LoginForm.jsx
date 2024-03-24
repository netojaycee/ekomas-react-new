import { Input, Spinner } from '@material-tailwind/react';
import React, { useState } from 'react';
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import { setCookie } from '../../Services/AuthServices';
import { apiUrl } from '../../config/env';


const LoginForm = () => {

  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);


  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Set loading to true when form is submitted

    // Clear previous errors
    // setErrors({});

    try {
      const response = await axios.post(`${apiUrl}/auth/sign-in`, formData);

      console.log(response);
      if (response.statusText === 'OK') {
        const { token, user } = response.data;
        console.log(response);
        setIsLoading(false);

        console.log(token)

        // Save the token to local storage
        setCookie('token', token);

        // Check user roles
        if (user.roles.includes('ADMIN')) {
          // If user is an admin, navigate to admin/dashboard
          setIsLoading(false);
          navigate('/admin/dashboard');
        } else {
          // If user is a regular user, navigate to user/dashboard
          setIsLoading(false);
          navigate('/user/dashboard');
        }
      } else {
        // Handle unsuccessful sign-in
        console.error('Sign-in failed:', response.data.message);
      }
    } catch (error) {
      // Handle the error
      // setErrors(error); // Assuming your backend returns errors in this format
      setIsLoading(false);
      console.error('Error:', error);
    }
  }


  return (
    <form onSubmit={handleSubmit} className='flex flex-col gap-3'>
      <div>
        <Input
          size="md"
          label="Email Address"
          value={formData.email}
          onChange={handleChange}
          type='email'
          className='rounded-none'
          name="email"
        />
        {errors.email && <p className='text-red-500 text-sm'>{errors.email}</p>}
      </div>
      <div>
        <Input
          size="md"
          label="Password"
          value={formData.password}
          onChange={handleChange}
          type="password" // Use secure text entry for passwords
          className='rounded-none'
          name="password"
        />
        {errors.password && <p className='text-red-500 text-sm'>{errors.password}</p>}
      </div>
      <div>
        <label>
          <input
            type='checkbox'
            className='m-1'
          />
          Remember me
        </label>
      </div>
      <div>
        {isLoading ? (
          <div className="flex flex-row text-white justify-center py-2 px-10 bg-secondary rounded-sm w-full  duration-300 transform hover:scale-95 hover:bg-red-500 transition ease-linear">
            <Spinner className="h-4 w-4" />
          </div>
        ) : (
          <button type='submit' className='flex flex-row text-white justify-center py-2 px-10 bg-secondary rounded-sm w-full  duration-300 transform hover:scale-95 hover:bg-red-500 transition ease-linear'>
            Sign in<ArrowRightIcon className="ml-1 w-6" />
          </button>
        )}
      </div>
    </form>
  );
};

export default LoginForm;
