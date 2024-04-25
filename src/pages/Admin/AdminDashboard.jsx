import React, { useEffect, useState } from "react";
import { Card, Typography } from "@material-tailwind/react";
import { Chartx } from "../../components/Charts/Chart";
import { apiUrl } from "../../config/env";
import axios from "axios";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import OrderConfirmCard from "../../components/AdminDashboard/OrderConfirmCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInfoCircle,
  faPencilAlt,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import { faXmarkCircle } from "@fortawesome/free-regular-svg-icons";

const TABLE_HEAD = [
  "Order",
  "Customer",
  "Email",
  "Amount",
  "Status",
  "Date",
  "",
];

function EditOrder({ data }) {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(!open);
  // const { name }  =  data;
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
              <button className="bg-green-200 py-2 px-5 rounded-md">
                shipped
              </button>
              <button className="bg-red-200 py-2 px-5 rounded-md">
                delivered
              </button>
            </div>
          </DialogBody>
        </Dialog>
      )}
    </>
  );
}

export default function AdminDashboard() {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Function to handle opening the OrderConfirmCard modal and set the selected order

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
        const response = await axios.get(`${apiUrl}/order/all/orders`, {
          headers,
        });
        console.log(response.data.allOrders);
        setOrders(response.data.allOrders);
      } catch (error) {
        console.error("Error fetching orders:", error);
        // Handle error
      }
    };

    fetchOrders();
  }, []);

  const handleOpenOrderConfirm = (order) => {
    setSelectedOrder(order);
  };
  return (
    <div className="flex flex-col w-full ">
      <div className="flex lg:flex-row flex-col w-full gap-5 p-5">
        <div className="flex flex-col gap-4 w-full lg:w-4/5 ">
          {/* <div className="grid lg:grid-cols-3 grid-cols-2 md:grid-cols-2 w-full gap-4">
            <div className="flex flex-col p-3 gap-3 overflow-hidden rounded-md shadow-lg">
              <p className="font-bold">Top sale</p>
              <p className="md:text-xl text-md lg:text-3xl">$19.637</p>
              <div className="flex w-full">
                <p>+2.00% this week</p>
              </div>
            </div>
            <div className="flex flex-col p-3 gap-3 overflow-hidden rounded-md shadow-lg">
              <p className="font-bold">Top sale</p>
              <p className="md:text-xl text-md lg:text-3xl">$19.637</p>
              <div className="flex w-full">
                <p>+2.00% this week</p>
              </div>
            </div>
            <div className="flex flex-col p-3 gap-3 overflow-hidden rounded-md shadow-lg">
              <p className="font-bold">Top sale</p>
              <p className="md:text-xl text-md lg:text-3xl">$19.637</p>
              <div className="flex w-full">
                <p>+2.00% this week</p>
              </div>
            </div>
          </div> */}
          {/* <div className="shadow-lg gap-4 rounded-lg border w-full overflow-auto h-96">
            <Chartx />
          </div> */}
        </div>
        {/* <div className="flex w-full lg:w-2/5 rounded-lg p-5 shadow flex-col">
          <p className="font-bold">Recent months</p>
          <small>Vistors</small>
        </div> */}
      </div>
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
                        {order.name}
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
                        className="font-normal bg-green-200 w-fit p-1 rounded-lg"
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
                        <EditOrder data={selectedOrder} />
                      </Typography>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Card>
      </div>
    </div>
  );
}
