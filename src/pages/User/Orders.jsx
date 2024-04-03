import React, { useState, useEffect } from "react";
import SpecialLayout from "../../components/SpecialLayout";
import {
  UserIcon,
  BriefcaseIcon,
  InboxIcon,
  HeartIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";
import axios from "axios";
import Sidebar from "../../components/Dashboard/SideBar";
import { UserSidebar } from "../../components/Dashboard/user_sidebar";
import UserLayout from "../../components/Dashboard/UserLayout";
import { Card } from "@material-tailwind/react";
import { apiUrl } from "../../config/env";
import OrderImage from "../../assets/images/order.png";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";

export default function Orders() {
  const [errors, setErrors] = useState({});
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    // Fetch orders data from the server

    let token = localStorage.getItem("user");
    token = token.replace(/['"]+/g, "");

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${apiUrl}/order/user-orders`, {
          headers,
        });
        console.log(response)
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
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
    <div className="flex-col flex w-full h-[90%] px-4 overflow-y-auto">
      <div>
        <h2 className="text-2xl">Orders</h2>
      </div>
      <hr className="w-full mt-2" />
      <div className="grid grid-cols-2 my-4 gap-4">
        {/* Render order details here */}
      </div>
      <Tabs value={activeTab} className="max-w-[70%] overflow-y-auto">
        <TabsHeader
          className="bg-transparent space-x-6"
          indicatorProps={{
            className: "bg-gray-900/10 shadow-none !text-gray-900",
          }}
        >
          <Tab
            value="all"
            className="border rounded-md"
            onClick={() => handleTabChange("all")}
          >
            All
          </Tab>
          {/* Add other tabs here */}
          <Tab
            value="pending"
            className="border rounded-md"
            onClick={() => handleTabChange("pending")}
          >
            Pending
          </Tab>
          <Tab
            value="completed"
            className="border rounded-md"
            onClick={() => handleTabChange("completed")}
          >
            Completed
          </Tab>
          <Tab
            value="cancelled"
            className="border rounded-md"
            onClick={() => handleTabChange("completed")}
          >
            Cancelled
          </Tab>
        </TabsHeader>
        <TabsBody>
          <TabPanel value="all">
          {/* {orders.map((order) => ( */}
              {/* <div key={order.id}> */}
                {/* Render order details */}
                {/* <p>Order ID: {order.id}</p> */}
                {/* Render other relevant details */}
              {/* </div> */}
            {/* ))} */}
            <div className="flex justify-between h-[200px] my-8 p-4 border gap-x-10 items-center">
              <div className="flex gap-4 w-2/3">
                <div className="object-contain p-3 border rounded flex-3 ">
                  <img src={OrderImage} className="h-20 w-30" alt="image" />
                </div>
                <div className="flex flex-col">
                  <div className="text-sm font-bold text-[#FF9213]">
                    Pending
                  </div>

                  <h2 className="text-black font-bold">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Impedit dolorem facilis{" "}
                  </h2>
                  <p>Quantity: 1</p>
                  <p className="font-bold text-lg">$200</p>
                </div>
              </div>
              <div className="btn w-1/3 flex justify-end">
                <button className="bg-red-500 text-white px-4 py-2 rounded-md">
                  Cancel order
                </button>
              </div>
            </div>
            <hr />
            <div className="flex justify-between h-[200px] my-8 p-4 border gap-x-10 items-center">
              <div className="flex gap-4 w-2/3">
                <div className="object-contain p-3 border rounded flex-3 ">
                  <img src={OrderImage} className="h-20 w-30" alt="image" />
                </div>
                <div className="flex flex-col">
                  <div className="text-sm font-bold text-green-600">
                    completed
                  </div>

                  <h2 className="text-black font-bold">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Impedit dolorem facilis{" "}
                  </h2>
                  <p>Quantity: 1</p>
                  <p className="font-bold text-lg">$200</p>
                </div>
              </div>
              <div className="btn w-1/3 flex justify-end items-center gap-4">
                <button className="bg-transparent border border-gray-300 text-black px-4 py-2 rounded-md">
                  Order again
                </button>
                <button className="bg-red-500 text-white px-4 py-2 rounded-md">
                  Del
                </button>
              </div>
            </div>
            <hr />
            <div className="flex justify-between h-[200px] my-8 p-4 border gap-x-10 items-center">
              <div className="flex gap-4 w-2/3">
                <div className="object-contain p-3 border rounded flex-3 ">
                  <img src={OrderImage} className="h-20 w-30" alt="image" />
                </div>
                <div className="flex flex-col">
                  <div className="text-sm font-bold text-red-600">
                    Cancelled
                  </div>

                  <h2 className="text-black font-bold">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Impedit dolorem facilis{" "}
                  </h2>
                  <p>Quantity: 1</p>
                  <p className="font-bold text-lg">$200</p>
                </div>
              </div>
              <div className="btn w-1/3 flex justify-end items-center gap-4">
                <button className="bg-transparent border border-gray-300 text-black px-4 py-2 rounded-md">
                  Re-order
                </button>
                <button className="bg-red-500 text-white px-4 py-2 rounded-md">
                  Del
                </button>
              </div>
            </div>
            <hr />
            <div className="flex justify-between h-[200px] my-8 p-4 border gap-x-10 items-center">
              <div className="flex gap-4 w-2/3">
                <div className="object-contain p-3 border rounded flex-3 ">
                  <img src={OrderImage} className="h-20 w-30" alt="image" />
                </div>
                <div className="flex flex-col">
                  <div className="text-sm font-bold text-red-600">
                    Cancelled
                  </div>

                  <h2 className="text-black font-bold">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Impedit dolorem facilis{" "}
                  </h2>
                  <p>Quantity: 1</p>
                  <p className="font-bold text-lg">$200</p>
                </div>
              </div>
              <div className="btn w-1/3 flex justify-end items-center gap-4">
                <button className="bg-transparent border border-gray-300 text-black px-4 py-2 rounded-md">
                  Re-order
                </button>
                <button className="bg-red-500 text-white px-4 py-2 rounded-md">
                  Del
                </button>
              </div>
            </div>
            <hr />
            <div className="flex justify-between h-[200px] my-8 p-4 border gap-x-10 items-center">
              <div className="flex gap-4 w-2/3">
                <div className="object-contain p-3 border rounded flex-3 ">
                  <img src={OrderImage} className="h-20 w-30" alt="image" />
                </div>
                <div className="flex flex-col">
                  <div className="text-sm font-bold text-red-600">
                    Cancelled
                  </div>

                  <h2 className="text-black font-bold">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Impedit dolorem facilis{" "}
                  </h2>
                  <p>Quantity: 1</p>
                  <p className="font-bold text-lg">$200</p>
                </div>
              </div>
              <div className="btn w-1/3 flex justify-end items-center gap-4">
                <button className="bg-transparent border border-gray-300 text-black px-4 py-2 rounded-md">
                  Re-order
                </button>
                <button className="bg-red-500 text-white px-4 py-2 rounded-md">
                  Del
                </button>
              </div>
            </div>
          </TabPanel>
          <TabPanel value="pending">
            {/* {orders
              .filter((order) => order.status === "pending")
              .map((order) => (
                // 
                <div className=""></div>
              ))} */}
          </TabPanel>

          <TabPanel value="completed">
            {/* {orders
              .filter((order) => order.status === "completed")
              .map((order) => (
             
              ))} */}
          </TabPanel>
        </TabsBody>
      </Tabs>
    </div>
  );
}
