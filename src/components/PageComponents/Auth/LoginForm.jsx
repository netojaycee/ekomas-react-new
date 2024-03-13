import { Input, Spinner } from '@material-tailwind/react';
import React, { useState } from 'react';
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { useNavigate } from 'react-router-dom';
import axios from "../../../api/axios";
// import Cookies from 'js-cookie';
// import { setCookie } from '../../Services/AuthServices';
// import { apiUrl } from '../../config/env';
import { useLoading } from '../../../context/LoadingContext';


const LoginForm = () => {

  const { isLoading, setIsLoading } = useLoading();

  const navigate = useNavigate();
  const [errors, setErrors] = useState({});


  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    // console.log('Submitting:', formData);

    // Clear previous errors
    setErrors({});

    //   try {
    //     // Perform Axios request here
    //     const response = await axios.post('https://ekomas-api.deltechverse.com/v1/auth/login', formData);
    //     // console.log(response.data);

    //     if (response.data.success) {
    //       // Redirect or handle success as needed
    //       navigate('/user/dashboard'); // Replace with your desired success page
    //     } else {
    //       return;
    //     }
    //   }  catch (error) {
    //     // Handle error
    //     // console.error('Error submitting form:', error);

    //     // Use the error from the server for form validation
    //     if (error.response && error.response.data && error.response.data.errors) {
    //       const backendErrors = error.response.data.errors;

    //       // Map backend errors to the corresponding form fields
    //       const updatedErrors = {};
    //       backendErrors.forEach(serverError => {
    //        const [fieldName, errorMessage] = serverError.split(' ');

    //         // Special handling for password match error

    //           updatedErrors[fieldName.toLowerCase()] = serverError;

    //       });

    //       setErrors(updatedErrors);
    //     } else {
    //       // Handle other types of errors (e.g., network errors)
    //       console.error('Unhandled error type:', error);
    //       setErrors({ general: 'An unexpected error occurred. Please try again later.' });
    //     }
    //   }
    // };


    try {
      // const response = await axios.post(`${apiUrl}/v1/auth/login`, formData);

      if (response.data.success) {
        const { sessionToken, user } = response.data.data;

        // Save the token to local storage
        // setCookie('sessionToken', sessionToken);

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
          // checked={rememberMe}
          // onChange={() => setRememberMe(!rememberMe)}
          />
          Remember me
        </label>
      </div>
      <div>
        {isLoading && (
          <div className="flex flex-row text-white justify-center py-2 px-10 bg-secondary rounded-sm w-full  duration-300 transform hover:scale-95 hover:bg-red-500 transition ease-linear">
            <Spinner className="h-4 w-4" />
          </div>
        )}
        {!isLoading && (
          <button type='submit' className='flex flex-row text-white justify-center py-2 px-10 bg-secondary rounded-sm w-full  duration-300 transform hover:scale-95 hover:bg-red-500 transition ease-linear'>
            Sign in<ArrowRightIcon className="ml-1 w-6" />
          </button>
        )}

      </div>
    </form>
  );
};

export default LoginForm;
