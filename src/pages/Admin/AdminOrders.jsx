import React, { useEffect, useState } from "react";
import { Card, Typography } from "@material-tailwind/react";
import { apiUrl } from "../../config/env";
import axios from "axios";
import { Dialog, DialogBody } from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle, faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { faXmarkCircle } from "@fortawesome/free-regular-svg-icons";
import { toast } from "react-toastify";

const TABLE_HEAD = ["Order", "Email", "Amount", "Status", "Date", ""];

function EditOrder({ data, fetchOrders }) {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(!open);

  const confirmOrderStatus = async (orderId) => {
    const token = JSON.parse(localStorage.getItem("user"));
    console.log(orderId);

    try {
      const res = await axios.post(
        `${apiUrl}/order/${orderId}`,
        {},
        {
          headers: {
            accept: "*/*",
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      // console.log(res);
      handleOpen();
      toast.success("Order Status Updated");
      fetchOrders();
    } catch (err) {
      console.log(err);
      toast.error("Order Status Not Updated");
    }
  };
  return (
    <>
      <FontAwesomeIcon
        icon={faPencilAlt}
        className="cursor-pointer"
        onClick={handleOpen}
        style={{ color: "red" }}
      />
      {data && (
        <Dialog open={open} handler={handleOpen}>
          <DialogBody className="p-3">
            <div className="flex justify-between items-center">
              <Typography
                variant="h5"
                className="font-semibold font-serif"
                color="blue-gray"
              >
                Order Management
              </Typography>
              <FontAwesomeIcon
                icon={faXmarkCircle}
                size="xl"
                className="cursor-pointer mr-5"
                onClick={handleOpen}
              />
            </div>
            <div className="flex flex-col md:flex-row gap-4 mt-5">
              <div className="grid grid-cols-2 md:grid-cols-1 gap-4 w-full lg:w-4/5 ">
                <div className="flex flex-col gap-2 w-full ">
                  <label className="text-sm font-medium text-gray-700 flex justify-between">
                    <span>Order Id</span>
                    <span className="text-green-500 flex gap-2 items-center">
                      <FontAwesomeIcon icon={faInfoCircle} bounce />{" "}
                      {data.orderStatus}
                    </span>
                  </label>
                  <p className="border border-gray-300 p-2 rounded-md">
                    {data._id}
                  </p>
                </div>
                <div className="flex flex-col gap-2 w-full ">
                  <label className="block text-sm font-medium text-gray-700">
                    Customer name
                  </label>
                  <p className="border border-gray-300 p-2 rounded-md">
                    {data.name}
                  </p>
                </div>
                <div className="flex flex-col gap-2 w-full ">
                  <label className="block text-sm font-medium text-gray-700">
                    Customer phone
                  </label>
                  <p className="border border-gray-300 p-2 rounded-md">
                    {data.mobile}
                  </p>
                </div>
                <div className="flex flex-col gap-2 w-full ">
                  <label className="block text-sm font-medium text-gray-700">
                    Customer Address
                  </label>
                  <p className="border border-gray-300 p-2 rounded-md">
                    {data.address}
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-4 w-full lg:w-4/5 ">
                <Card className="p-4">
                  <h2>Order Items</h2>
                  <hr />
                  <ul className="list-none p-2">
                    {data.cart.map((product) => (
                      <li
                        key={product._id}
                        className="flex justify-between items-center"
                      >
                        <span>{product.name}</span>
                        <span>{product.quantity}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
                <Card></Card>
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-2 mt-5 items-center justify-center">
              <button
                disabled={data.orderStatus === "completed"}
                onClick={() => confirmOrderStatus(data._id)}
                className={`text-white font-serif font-semibold py-2 px-5 rounded-md ${
                  data.orderStatus === "shipped"
                    ? "bg-blue-300"
                    : data.orderStatus === "completed"
                    ? "bg-green-300"
                    : "bg-red-300"
                }`}
              >
                {data.orderStatus === "shipped"
                  ? "Mark as delivered"
                  : data.orderStatus === "completed"
                  ? "Delivered"
                  : "Mark as Shipped"}
              </button>
            </div>
          </DialogBody>
        </Dialog>
      )}
    </>
  );
}

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Fetch orders data from the server

  let token = localStorage.getItem("user");
  token = token.replace(/['"]+/g, "");

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${apiUrl}/order/all/orders`, {
        headers,
      });
      // console.log(response.data.allOrders);
      setOrders(response.data.allOrders);
    } catch (error) {
      console.error("Error fetching orders:", error);
      // Handle error
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleOpenOrderConfirm = (order) => {
    setSelectedOrder(order);
  };

  return (
    <div className="flex w-full rounded p-5">
      <Card className="h-full w-full overflow-scroll">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-b border-blue-gray-100 bg-badge p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => {
              const isLast = index === orders.length - 1;
              const classes = isLast
                ? "p-4"
                : "p-4 border-b border-blue-gray-50";

              return (
                <tr key={index}>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {index + 1}
                    </Typography>
                  </td>

                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {order.email}
                    </Typography>
                  </td>

                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {order.total}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className={` font-normal w-full text-center p-1 rounded-lg ${
                        order.orderStatus === "shipped"
                          ? "bg-blue-300"
                          : order.orderStatus === "completed"
                          ? "bg-green-300"
                          : "bg-red-300"
                      }`}
                    >
                      {order.orderStatus}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {new Date(order.updatedAt).toLocaleString()}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      as="a"
                      href="#"
                      variant="small"
                      color="blue-gray"
                      className="font-medium"
                      onClick={() => handleOpenOrderConfirm(order)}
                    >
                      <EditOrder
                        data={selectedOrder}
                        fetchOrders={fetchOrders}
                      />
                    </Typography>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
