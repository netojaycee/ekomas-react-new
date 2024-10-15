import React, { useEffect, useState } from "react";
import { Card, Typography } from "@material-tailwind/react";
import { Dialog, DialogBody } from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle, faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { faXmarkCircle } from "@fortawesome/free-regular-svg-icons";
import { toast } from "react-toastify";
import { Table } from "antd";
import axiosInstance from "../../config/axiosInstance";

function EditOrder({ data, fetchOrders }) {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(!open);

  const confirmOrderStatus = async (orderId) => {
    try {
      const res = await axiosInstance.post(`/order/${orderId}`, {});

      handleOpen();
      toast.success("Order Status Updated");
      fetchOrders();
    } catch (err) {
      toast.error("Order Status Not Updated");
    }
  };

  const confirmPaymentStatus = async (orderId) => {
    try {
      const res = await axiosInstance.post(`/order/verify-payment/${orderId}`, {});

      handleOpen();
      toast.success("Payment Status Updated");
      fetchOrders();
    } catch (err) {
      toast.error("Payment Status Not Updated");
    }
  };

  const downloadReceipt = () => {
    const link = document.createElement('a');
    link.href = data.proofOfPayment;
    link.download = 'receipt.jpg';  // You can change the file name and extension
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
                className="font-semibold font-inter"
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
                {/* Order Details */}
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

              {/* Order Items */}
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
              </div>
            </div>

            {/* Buttons Section */}
            <div className="flex flex-col md:flex-row gap-2 mt-5 items-center justify-center">
              {/* Download Receipt Button */}
              <button
                onClick={downloadReceipt}
                className="bg-blue-500 text-white font-interfont-semibold py-2 px-5 rounded-md"
              >
                Download Receipt
              </button>

              {/* Conditional Payment and Order Status Buttons */}
              {!data.isPaid && (
                <button
                  onClick={() => confirmPaymentStatus(data._id)}
                  className="bg-yellow-500 text-white font-interfont-semibold py-2 px-5 rounded-md"
                >
                  Confirm Payment
                </button>
              )}

              {data.isPaid && (
                <button
                  disabled={data.orderStatus === "completed"}
                  onClick={() => confirmOrderStatus(data._id)}
                  className={`text-white font-interfont-semibold py-2 px-5 rounded-md ${
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
              )}
            </div>
          </DialogBody>
        </Dialog>
      )}
    </>
  );
}

function AdminOrders({ title, fields = ["_id", "action"] }) {
  // Define default empty fields prop
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const fetchOrders = async () => {
    try {
      const response = await axiosInstance.get(`/order/all/orders`);

      setOrders(response.data.allOrders);
    } catch (error) {
      // console.error("Error fetching orders:", error);
      // Handle error
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleOpenOrderConfirm = (order) => {
    setSelectedOrder(order);
  };

  const getColumns = () => {
    return [
      // {
      //   title: "OrderId",
      //   dataIndex: "_id",
      //   key: "orderId",
      //   render: (text) => <Typography variant="small">{text}</Typography>,
      // },
      {
        title: "Email",
        dataIndex: "email",
        key: "email",
        render: (text) => <Typography variant="small">{text}</Typography>,
      },
      {
        title: "Order Status",
        dataIndex: "orderStatus",
        key: "status",
        render: (text) => (
          <Typography
            variant="small"
            color="blue-gray"
            className={` text-white font-semibold w-full text-center p-1 rounded-lg ${
              text === "shipped"
                ? "bg-blue-300"
                : text === "completed"
                ? "bg-green-300"
                : "bg-red-300"
            }`}
          >
            {text}
          </Typography>
        ),
      },
      {
        title: "Payment Status",
        dataIndex: "isPaid",
        key: "isPaid",
        render: (text) => (
          <Typography
            variant="small"
            color="blue-gray"
            className={`text-white font-semibold w-full text-center p-1 rounded-lg ${
              text === true ? "bg-blue-300" : "bg-red-300"
            }`}
          >
            {text === true ? "Paid" : "Pending"}
          </Typography>
        ),
      },
      {
        title: "Total",
        dataIndex: "total",
        key: "total",
        render: (text) => <Typography variant="small">&#8358; {text}</Typography>,
      },
      {
        title: "Date",
        dataIndex: "updatedAt",
        key: "date",
        render: (text) => (
          <Typography variant="small">
            {new Date(text).toLocaleString()}
          </Typography>
        ),
        // {new Date(order.updatedAt).toLocaleString()}
      },
    ].concat(
      fields.map((field) => ({
        title: field === "_id" ? "OrderId" : field, // Use prop value as column title
        dataIndex: field === "action" ? "" : field, // Use prop value as data index
        key: field,
        render: (item) =>
          field === "action" ? (
            <EditOrder
              data={item}
              open={openDialog}
              handleOpen={setOpenDialog}
              fetchOrders={fetchOrders}
            />
          ) : (
            <Typography variant="small">{item}</Typography>
          ),
      }))
    );
  };

  const columns = getColumns();

  return (
    <div className="">
      <h3 className="font-bold text-xl mb-3">
        {title ? title : "All Orders Page"}
      </h3>
      <div className="bg-white shadow-md p-3 overflow-auto">
        <Table columns={columns} dataSource={orders} />
      </div>
    </div>
  );
}

export default AdminOrders;
