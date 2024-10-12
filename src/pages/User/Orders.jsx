import React, { useState, useEffect, useContext } from "react";
import OrderImage from "../../assets/images/order.png";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import AuthContext from "../../components/Context/AuthContext";
import axiosInstance from "../../config/axiosInstance";

export default function Orders() {
  const [errors, setErrors] = useState({});
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState("all");
  const { auth } = useContext(AuthContext);

  const fetchOrders = async () => {
    try {
      if (auth?.user?.name) {
        const response = await axiosInstance.get("/order/user-orders");
        setOrders(response.data.orders);
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
      setErrors({ fetch: "Failed to fetch orders. Please try again later." });
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [auth?.user?.name]);

  const handleTabChange = (value) => {
    setActiveTab(value);
  };

  const renderOrders = (filteredOrders) => {
    if (filteredOrders.length === 0) {
      return <p>No orders found.</p>;
    }

    return filteredOrders.map((order) => (
      <React.Fragment key={order._id}>
        <div className="lg:flex-row flex flex-col lg:justify-between h-[230px] md:h-[100px] my-2 p-4 border-2 border-gray-400 gap-3 lg:gap-x-10 items-center">
          <div className="md:flex-row flex flex-col gap-4 w-full lg:w-2/3">
            <div className="object-contain p-3 border rounded flex-3">
              <img
                src={OrderImage}
                className="md:h-20 h-10 w-[60px] md:w-30"
                alt="order"
              />
            </div>
            <div className="flex items-center justify-between w-full">
              <div className="flex flex-col w-[70%]">
                <h2 className="text-black font-bold line-clamp-1 overflow-hidden">
                  {order.cart.map((item) => item.name).join(", ")}
                </h2>
                <p>Products: {order.cart.length}</p>
                <p className="font-bold text-lg">&#8358; {order.total}</p>
              </div>
             <div className="">
              <div className="md:hidden flex flex-col">
              <p className="text-xs">Delivery Status</p>
              <button
                className={`${
                  order.orderStatus === "pending"
                    ? "bg-red-500"
                    : "bg-green-500"
                } text-white px-4 py-2 rounded-md`}
              >
                {order.orderStatus}
              </button>
            </div>

            <div className="md:hidden flex flex-col">
              <p className="text-xs">Payment Status</p>
              <button
                className={`${
                  order.isPaid ? "bg-green-500" : "bg-yellow-500"
                } text-white px-4 py-2 rounded-md`}
              >
                {order.isPaid ? "Paid" : "Processing"}
              </button>
            </div></div>
            </div>
          </div>
          <div className="btn hidden w-full lg:w-1/3 md:flex justify-center md:justify-end items-center gap-4">
            <div className="flex flex-col">
              <p className="">Delivery Status</p>
              <button
                className={`${
                  order.orderStatus === "pending"
                    ? "bg-red-500"
                    : "bg-green-500"
                } text-white px-4 py-2 rounded-md`}
              >
                {order.orderStatus}
              </button>
            </div>
            {/* New Button for Payment Status */}
            <div className="flex flex-col">
              <p className="">Payment Status</p>
              <button
                className={`${
                  order.isPaid ? "bg-green-500" : "bg-yellow-500"
                } text-white px-4 py-2 rounded-md`}
              >
                {order.isPaid ? "Paid" : "Processing"}
              </button>
            </div>
          </div>
        </div>
        <hr />
      </React.Fragment>
    ));
  };

  return (
    <div className="flex-col flex w-full px-4 overflow-y-auto">
      <div>
        <h2 className="text-2xl">Orders</h2>
      </div>
      <hr className="w-full mt-2" />
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
        </TabsHeader>
        <TabsBody>
          <TabPanel value="all">{renderOrders(orders)}</TabPanel>
          <TabPanel value="pending">
            {renderOrders(
              orders.filter((order) => order.orderStatus === "pending")
            )}
          </TabPanel>
          <TabPanel value="completed">
            {renderOrders(
              orders.filter((order) => order.orderStatus === "completed")
            )}
          </TabPanel>
        </TabsBody>
      </Tabs>
    </div>
  );
}
