import React, { useEffect, useState } from 'react';

import axios from 'axios';

import { Card } from '@material-tailwind/react';
import { apiUrl } from '../../config/env';

export default function UserDashboard() {
  const [userDetails, setUserDetails] = useState({});
  const [editedDetails, setEditedDetails] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    phone: '',
  });
  const [errors, setErrors] = useState({});
 

  return (
      <div className='flex-col flex w-full h-[90%] p-4'>
        <div>
          <h2>Account Overview</h2>
        </div>
        <hr className='w-full' />
        <div className='grid grid-cols-1 md:grid-cols-2 my-4 gap-4'>
          <Card className='border rounded-none pb-20'>
            <h5 className='px-4 py-2'>Account Details</h5>
            <hr className=" border-blue-gray-50" />
            <div className="flex flex-col gap-2 lg:gap-5"> 
              <p className="font-bold px-4 pt-4">{userDetails.first_name || 'N/A'} {userDetails.last_name || 'N/A'} </p>
              <small className='px-4'>{userDetails.email || 'N/A'}</small>
              <small className='px-4'>{userDetails.phone || 'N/A'}</small>
              <small className='px-4'>{userDetails.address || 'N/A'}</small>
            </div>
          </Card>

          <Card className='border rounded-none pb-1-'>
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
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Address</label>
                <input
                  type="text"
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                  value={editedDetails.address}
                  onChange={(e) => setEditedDetails({ ...editedDetails, address: e.target.value })}
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Phone</label>
                <input
                  type="text"
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                  value={editedDetails.phone}
                  onChange={(e) => setEditedDetails({ ...editedDetails, phone: e.target.value })}
                />
              </div>
              <button
                className="bg-primary text-white px-4 py-2 rounded-md"
                // onClick={handleEditDetails}
              >
                Save Changes
              </button>
            </div>
          </Card>

        </div> 
      </div>
  )
}
