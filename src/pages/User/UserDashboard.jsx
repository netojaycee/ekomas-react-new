import React, { useEffect, useState } from 'react';
import SpecialLayout from '../../components/SpecialLayout';
import { UserIcon, BriefcaseIcon, InboxIcon, HeartIcon, ClockIcon } from '@heroicons/react/24/outline';
import axios from 'axios';
import Sidebar from '../../components/Dashboard/SideBar';
import { UserSidebar } from '../../components/Dashboard/user_sidebar';
import UserLayout from '../../components/Dashboard/UserLayout';
import { Card } from '@material-tailwind/react';
import { apiUrl } from '../../config/env';

export default function UserDashboard() {
  const [userDetails, setUserDetails] = useState({});
  const [editedDetails, setEditedDetails] = useState({
    firstName: '',
    lastName: '',
    email: '',
  });
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
  useEffect(() => {
    // console.log(accessToken)
    axios
      .get(`${apiUrl}/v1/users/me`, {
        
      })
      .then((response) => {
        console.log(response.data);
        setUserDetails(response.data.data);
        setEditedDetails({
          firstName: response.data.data.first_name,
          lastName: response.data.data.last_name,
          email: response.data.data.email,
        });


        
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleEditDetails = () => {
    // Perform API call to update user details with editedDetails
    // ...
  };

  return (
    <UserLayout>
      <div className='flex-col flex w-full h-[90%] p-4'>
        <div>
          <h2>Account Overview</h2>
        </div>
        <hr className='w-full' />
        <div className='grid grid-cols-2 my-4 gap-4'>
          <Card className='border rounded-none pb-20'>
            <h5 className='px-4 py-2'>Account Details</h5>
            <hr className=" border-blue-gray-50" />
            <div className=""> 
              <p className="font-bold px-4 pt-4">{userDetails.first_name} {userDetails.last_name} </p>
              <small className='px-4'>{userDetails.email}</small>
            </div>
          </Card>

          <Card className='border rounded-none pb-20'>
            <h5 className='px-4 py-2 font-bold'>Edit Details</h5>
            <hr className="border-blue-gray-50" />
            <div className="px-4 py-2">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">First Name</label>
                <input
                  type="text"
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                  value={editedDetails.firstName}
                  onChange={(e) => setEditedDetails({ ...editedDetails, firstName: e.target.value })}
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Last Name</label>
                <input
                  type="text"
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                  value={editedDetails.lastName}
                  onChange={(e) => setEditedDetails({ ...editedDetails, lastName: e.target.value })}
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                  value={editedDetails.email}
                  onChange={(e) => setEditedDetails({ ...editedDetails, email: e.target.value })}
                />
              </div>
              <button
                className="bg-primary text-white px-4 py-2 rounded-md"
                onClick={handleEditDetails}
              >
                Save Changes
              </button>
            </div>
          </Card>

        </div> 
      </div>
    </UserLayout >
  )
}
