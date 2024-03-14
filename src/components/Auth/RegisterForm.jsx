import { Input, Spinner } from '@material-tailwind/react';
import React, { useState } from 'react';
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { apiUrl } from '../../config/env';



export default function Register() {

  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    confirm_password: '',
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
      const response = await axios.post(`${apiUrl}/v1/auth/register`, formData);
      // console.log(response.data);

      if (response.data.success) {
        // Redirect or handle success as needed
        setIsLoading(false);
        navigate('/login'); // Replace with your desired success page
      } else {
        return;
      }
    } catch (error) {
      setIsLoading(false);

      // Handle error
      // console.error('Error submitting form:', error);

      // Use the error from the server for form validation
      if (error.response && error.response.data && error.response.data.errors) {
        setIsLoading(false);

        const backendErrors = error.response.data.errors;

        // Map backend errors to the corresponding form fields
        const updatedErrors = {};
        backendErrors.forEach(serverError => {
          const [fieldName, errorMessage] = serverError.split(' ');

          // Special handling for password match error
          if (fieldName.toLowerCase() === 'confirm_password' && serverError.toLowerCase() === 'password' &&
            serverError.includes('do not match')) {
            setIsLoading(false);

            updatedErrors['confirm_password'] = serverError;
          } else {
            updatedErrors[fieldName.toLowerCase()] = serverError;
          }
        });


        setErrors(updatedErrors);
      } else {
        // Handle other types of errors (e.g., network errors)
        console.error('Unhandled error type:', error);
        setErrors({ general: 'An unexpected error occurred. Please try again later.' });
      }
    }
  };



  return (
    <div className='flex flex-col gap-3'>

      <form onSubmit={handleSubmit} className='flex flex-col gap-3'>
        <div>
          <Input
            size="md"
            label="First name"
            className='rounded-none focus:outline-none focus:ring-0'
            name="first_name"
            type='text'
            value={formData.first_name}
            onChange={handleChange}
          />
          {
            errors.first_name && <p className='text-red-500 text-sm'>{errors.first_name}</p>
          }
        </div>
        <div>
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
        </div>
        <div>
          <Input
            size="md"
            label="Email"
            className='rounded-none'
            name="email"
            type='email'
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <p className='text-red-500 text-sm'>{errors.email}</p>}
        </div>
        <div>
          <Input
            size="md"
            label="Password"
            className='rounded-none'
            name="password"
            type='password'
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <p className='text-red-500 text-sm'>{errors.password}</p>}
        </div>
        <div>
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
        </div>

        <div>
          {isLoading && (
            <div className="flex flex-row text-white justify-center py-2 px-10 bg-secondary rounded-sm w-full  duration-300 transform hover:scale-95 hover:bg-red-500 transition ease-linear">
              <Spinner className="h-4 w-4" />
            </div>
          )}
          {!isLoading && (
            <button type='submit' className='flex flex-row text-white justify-center py-2 px-10 bg-secondary rounded-sm w-full  duration-300 transform hover:scale-95 hover:bg-red-500 transition ease-linear'>
              Register<ArrowRightIcon className="ml-1 w-6" />
            </button>
          )}
        </div>
      </form>

    </div>
  );
};

