import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { apiUrl } from "../../config/env";
import OrderImage from "../../assets/images/order.png";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import AuthContext from "../../components/Context/AuthContext";

export default function Orders() {
  const [errors, setErrors] = useState({});
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState("all");
  const { auth } = useContext(AuthContext);


  const fetchOrders = async () => {
    try {
      if (auth?.user?.name) {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        const token = storedUser.token;

        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        };

        const response = await axios.get(`${apiUrl}/order/userOrder`, {
          headers,
        });
        console.log(response);
        setOrders(response.data.orders); // Populate userDetails from API
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [auth?.user?.name]);

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
      <Tabs value={activeTab} className="w-full overflow-y-auto">
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
          {/* <Tab value="cancelled" className='border rounded-md' onClick={() => handleTabChange('completed')}>
            Cancelled
          </Tab> */}
        </TabsHeader>
        <TabsBody>
          <TabPanel value="all">
            {orders.map((order) => (
              <>
                <div
                  key={order._id}
                  className="lg:flex-row flex flex-col lg:justify-between h-[400px] overflow-auto md:h-[200px] my-8 p-4 border gap-3 lg:gap-x-10 items-center"
                >
                  <div className="md:flex-row flex flex-col gap-4 w-full lg:w-2/3">
                    <div className="object-contain p-3 border rounded flex-3 ">
                      <img src={OrderImage} className="h-20 w-30" alt="image" />
                    </div>
                    <div className="flex flex-col">
                      <h2 className="text-black font-bold">{order.name}</h2>
                      <p>Quantity: {order.quantity}</p>
                      <p className="font-bold text-lg">{order.price}</p>
                    </div>
                  </div>
                  {/* <div className="btn w-full lg:w-1/3 flex justify-center md:justify-end items-center gap-4">
                <button className='bg-black font-bold text-white px-4 py-2 rounded-md'>Buy now</button>
                <button className='bg-red-500 text-white px-4 py-2 rounded-md'>Del</button>
              </div> */}
                </div>
                <hr />
              </>
            ))}
          </TabPanel>
          <TabPanel value="pending">
            {orders
              .filter((order) => order.status === "pending")
              .map((order) => (
                <>
                  <div
                    key={order._id}
                    className="lg:flex-row flex flex-col lg:justify-between h-[400px] overflow-auto md:h-[200px] my-8 p-4 border gap-3 lg:gap-x-10 items-center"
                  >
                    <div className="md:flex-row flex flex-col gap-4 w-full lg:w-2/3">
                      <div className="object-contain p-3 border rounded flex-3 ">
                        <img
                          src={OrderImage}
                          className="h-20 w-30"
                          alt="image"
                        />
                      </div>
                      <div className="flex flex-col">
                        <h2 className="text-black font-bold">
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Impedit dolorem facilis{" "}
                        </h2>
                        <p>Quantity: 1</p>
                        <p className="font-bold text-lg">$200</p>
                      </div>
                    </div>
                    {/* <div className="btn w-full lg:w-1/3 flex justify-center md:justify-end items-center gap-4">
             <button className='bg-black font-bold text-white px-4 py-2 rounded-md'>Buy now</button>
             <button className='bg-red-500 text-white px-4 py-2 rounded-md'>Del</button>
           </div> */}
                  </div>
                  <hr />
                </>
              ))}
          </TabPanel>

          <TabPanel value="completed">
            {orders
              .filter((order) => order.status === "completed")
              .map((order) => (
                <>
                  <div
                    key={order._id}
                    className="lg:flex-row flex flex-col lg:justify-between h-[400px] overflow-auto md:h-[200px] my-8 p-4 border gap-3 lg:gap-x-10 items-center"
                  >
                    <div className="md:flex-row flex flex-col gap-4 w-full lg:w-2/3">
                      <div className="object-contain p-3 border rounded flex-3 ">
                        <img
                          src={OrderImage}
                          className="h-20 w-30"
                          alt="image"
                        />
                      </div>
                      <div className="flex flex-col">
                        <h2 className="text-black font-bold">
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Impedit dolorem facilis{" "}
                        </h2>
                        <p>Quantity: 1</p>
                        <p className="font-bold text-lg">$200</p>
                      </div>
                    </div>
                    {/* <div className="btn w-full lg:w-1/3 flex justify-center md:justify-end items-center gap-4">
                 <button className='bg-black font-bold text-white px-4 py-2 rounded-md'>Buy now</button>
                 <button className='bg-red-500 text-white px-4 py-2 rounded-md'>Del</button>
               </div> */}
                  </div>
                  <hr />
                </>
              ))}
          </TabPanel>
        </TabsBody>
      </Tabs>
    </div>
  );
}
