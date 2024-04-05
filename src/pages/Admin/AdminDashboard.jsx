import React, { useEffect, useState } from "react";
import AdminLayout from "../../components/Dashboard/AdminLayout";
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

const TABLE_HEAD = [
  "Order",
  "Customer",
  "Email",
  "Amount",
  "Status",
  "Date",
  "",
];


 
function EditOrder() {
  const [open, setOpen] = React.useState(false);
 
  const handleOpen = () => setOpen(!open);
 
  return (
    <>
      <Button onClick={handleOpen} variant="gradient">
        Open Dialog
      </Button>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>Its a simple dialog.</DialogHeader>
        <DialogBody>
          The key to more success is to have a lot of pillows. Put it this way,
          it took me twenty five years to get these plants, twenty five years of
          blood sweat and tears, and I&apos;m never giving up, I&apos;m just
          getting started. I&apos;m up to something. Fan luv.
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="green" onClick={handleOpen}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}

export default function AdminDashboard() {
  const [orders, setOrders] = useState([]);

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
  return (
    <div className="flex flex-col w-full ">
      <div className="flex lg:flex-row flex-col w-full gap-8 p-10">
        <div className="flex flex-col gap-4 w-full lg:w-4/5 ">
          <div className="grid lg:grid-cols-3 grid-cols-2 md:grid-cols-2 w-full gap-4">
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
          </div>
          <div className="shadow-lg gap-4 rounded-lg border w-full overflow-auto h-96">
            <Chartx />
          </div>
        </div>
        <div className="flex w-full lg:w-2/5 rounded-lg p-5 shadow flex-col">
          <p className="font-bold">Recent months</p>
          <small>Vistors</small>
        </div>
      </div>
      <div className="flex w-full rounded p-10">
        <Card className="h-full w-full overflow-scroll">
          <table className="w-full min-w-max  table-auto text-left">
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
              {orders.map(
                (
                  { _id, name, email, total, orderStatus, updatedAt },
                  index
                ) => {
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
                          {name}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {email}
                        </Typography>
                      </td>

                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {total}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal bg-green-200 w-fit p-1 rounded-lg"
                        >
                          {orderStatus}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {new Date(updatedAt).toLocaleString()}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          as="a"
                          href="#"
                          variant="small"
                          color="blue-gray"
                          className="font-medium"
                        >
                          Edit
                        </Typography>
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        </Card>
      </div>
    </div>
  );
}
