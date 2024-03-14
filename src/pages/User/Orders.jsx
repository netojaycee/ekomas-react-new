import React, { useState } from 'react';
import SpecialLayout from '../../components/SpecialLayout';
import { UserIcon, BriefcaseIcon, InboxIcon, HeartIcon, ClockIcon } from '@heroicons/react/24/outline';
import axios from 'axios';
import Sidebar from '../../components/Dashboard/SideBar';
import { UserSidebar } from '../../components/Dashboard/user_sidebar';
import UserLayout from '../../components/Dashboard/UserLayout';
import { Card } from '@material-tailwind/react';
import { apiUrl } from '../../config/env';

export default function Orders() {
  const [errors, setErrors] = useState({});
  const handleLogout = async (e) => {
    e.preventDefault();
    // console.log('Submitting:', formData);

    // Clear previous errors
    setErrors({});

    try {
      // Perform Axios request here
      const response = await axios.post(`${apiUrl}/v1/auth/logout`);
      // console.log(response.data);

      if (response.data.success) {
        // Redirect or handle success as needed
        navigate('/login'); // Replace with your desired success page
      } else {
        return;
      }
    } catch (error) {
      // Handle error
      // console.error('Error submitting form:', error);

      // Use the error from the server for form validation
      if (error.response && error.response.data && error.response.data.errors) {
        const backendErrors = error.response.data.errors;

        // Map backend errors to the corresponding form fields
        const updatedErrors = {};
        backendErrors.forEach(serverError => {
          const [fieldName, errorMessage] = serverError.split(' ');

          // Special handling for password match error

          updatedErrors[fieldName.toLowerCase()] = serverError;

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
    <UserLayout>
      <div className='flex-col flex w-full h-[90%] px-4'>
        <div>
          <h2 className='text-2xl'>Orders</h2>
        </div>
        <hr className='w-full mt-2' />
        <div className='grid grid-cols-2 my-4 gap-4'>
         Order details
 
        </div> 
      </div>
    </UserLayout >
  )
}
