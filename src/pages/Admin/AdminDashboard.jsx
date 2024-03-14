import React from 'react'
import AdminLayout from '../../components/Dashboard/AdminLayout'
import { Card, Typography } from "@material-tailwind/react";
import { Chartx } from '../../components/Charts/Chart';


const TABLE_HEAD = ["Order", "Customer", "Email", "Amount", "Status", "Date", ""];

const TABLE_ROWS = [
  {
    order: "811",
    customer: "MJohn",
    email: "example@gmail.com",
    amount: "$848",
    status: "Delivered",
    date: "23/04/18",
  },
  {
    order: "811",
    customer: "MJohn",
    email: "example@gmail.com",
    amount: "$848",
    status: "Delivered",
    date: "23/04/18",
  },
  {
    order: "811",
    customer: "MJohn",
    email: "example@gmail.com",
    amount: "$848",
    status: "Delivered",
    date: "23/04/18",
  },
  {
    order: "811",
    customer: "MJohn",
    email: "example@gmail.com",
    amount: "$848",
    status: "Delivered",
    date: "23/04/18",
  },
  {
    order: "811",
    customer: "MJohn",
    email: "example@gmail.com",
    amount: "$848",
    status: "Delivered",
    date: "23/04/18",
  },
  {
    order: "811",
    customer: "MJohn",
    email: "example@gmail.com",
    amount: "$848",
    status: "Delivered",
    date: "23/04/18",
  },
];

export default function AdminDashboard() {
  return (
    <AdminLayout>
      <div className='flex flex-col w-full '>
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
            <div className="shadow-lg gap-4 rounded-lg border w-full overflow-auto h-96"><Chartx /></div>
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
                {TABLE_ROWS.map(({ order, customer, email, amount, status, date }, index) => {
                  const isLast = index === TABLE_ROWS.length - 1;
                  const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

                  return (
                    <tr key={index}>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {order}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {customer}
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
                          {amount}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal bg-green-200 w-fit p-1 rounded-lg"
                        >
                          {status}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {date}
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
                })}
              </tbody>
            </table>
          </Card>
        </div>
      </div>
    </AdminLayout>
  )
}
