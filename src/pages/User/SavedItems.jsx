import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { apiUrl } from '../../config/env';
import OrderImage from '../../assets/images/order.png';
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";

export default function SavedItems() {
  const [errors, setErrors] = useState({});
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    // Fetch orders data from the server
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${apiUrl}/v1/orders`);
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
        // Handle error
      }
    };

    fetchOrders();
  }, []);

  const handleLogout = async (e) => {
    e.preventDefault();
    // Your logout logic here
  };

  const handleTabChange = (value) => {
    setActiveTab(value);
  };

  return (
    <div className='flex-col flex w-full h-[90%] px-4 overflow-y-auto'>
      <div>
        <h2 className='text-2xl'>Orders</h2>
      </div>
      <hr className='w-full mt-2' />
      <div className='grid grid-cols-2 my-4 gap-4'>
        {/* Render order details here */}
      </div>
      <Tabs value={activeTab} className="w-full lg:max-w-[70%] overflow-y-auto">
        <TabsHeader
          className="bg-transparent space-x-6"
          indicatorProps={{
            className: "bg-gray-900/10 shadow-none !text-gray-900",
          }}
        >
          <Tab value="all" className='border rounded-md' onClick={() => handleTabChange('all')}>
            All
          </Tab>
          {/* Add other tabs here */}
          <Tab value="pending" className='border rounded-md' onClick={() => handleTabChange('pending')}>
            Pending
          </Tab>
          <Tab value="completed" className='border rounded-md' onClick={() => handleTabChange('completed')}>
            Completed
          </Tab>
          <Tab value="cancelled" className='border rounded-md' onClick={() => handleTabChange('completed')}>
            Cancelled
          </Tab>
        </TabsHeader>
        <TabsBody>
          <TabPanel value="all">
            {orders.map(order => (
              <div key={order.id}>
                {/* Render order details */}
                <p>Order ID: {order.id}</p>
                {/* Render other relevant details */}

              </div>

            ))}
            
            <div className="lg:flex-row flex flex-col lg:justify-between h-[400px] overflow-auto md:h-[200px] my-8 p-4 border gap-3 lg:gap-x-10 items-center">
              <div className="md:flex-row flex flex-col gap-4 w-full lg:w-2/3">
                <div className="object-contain p-3 border rounded flex-3 "><img src={OrderImage} className='h-20 w-30' alt="image" /></div>
                <div className="flex flex-col">
                  <h2 className='text-black font-bold'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit dolorem facilis </h2>
                  <p>Quantity: 1</p>
                  <p className="font-bold text-lg">$200</p>
                </div>
              </div>
              <div className="btn w-full lg:w-1/3 flex justify-center md:justify-end items-center gap-4">
                <button className='bg-black font-bold text-white px-4 py-2 rounded-md'>Buy now</button>
                <button className='bg-red-500 text-white px-4 py-2 rounded-md'>Del</button>
              </div>
            </div>
            <hr />
            <div className="lg:flex-row flex flex-col lg:justify-between h-[400px] overflow-auto md:h-[200px] my-8 p-4 border gap-3 lg:gap-x-10 items-center">
              <div className="md:flex-row flex flex-col gap-4 w-full lg:w-2/3">
                <div className="object-contain p-3 border rounded flex-3 "><img src={OrderImage} className='h-20 w-30' alt="image" /></div>
                <div className="flex flex-col">
                  <h2 className='text-black font-bold'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit dolorem facilis </h2>
                  <p>Quantity: 1</p>
                  <p className="font-bold text-lg">$200</p>
                </div>
              </div>
              <div className="btn w-full lg:w-1/3 flex justify-center md:justify-end items-center gap-4">
                <button className='bg-black font-bold text-white px-4 py-2 rounded-md'>Buy now</button>
                <button className='bg-red-500 text-white px-4 py-2 rounded-md'>Del</button>
              </div>
            </div>
            
          </TabPanel>
          <TabPanel value="pending">
            {orders.filter(order => order.status === 'pending').map(order => (
              // <div key={order.id} className='text-black '>
              //   {/* Render order details */}
              //   <p>Order ID: {order.id}</p>
              //   {/* Render other relevant details */}
              //   ssssssssss
              // </div>
              <div className="">

              </div>

            ))}
          </TabPanel>

          <TabPanel value="completed">
            {orders.filter(order => order.status === 'completed').map(order => (
              <div key={order.id}>
                ddd
                {/* Render order details */}
                <p>Order ID: {order.id}</p>
                {/* Render other relevant details */}
              </div>
            ))}
          </TabPanel>
        </TabsBody>

      </Tabs>
    </div>
  );
}
