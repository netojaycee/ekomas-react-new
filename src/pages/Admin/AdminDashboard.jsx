import React from "react";
import { FaArrowTrendDown, FaArrowTrendUp } from "react-icons/fa6";
import { Column } from "@ant-design/plots";
import { Table } from "antd";
import AdminOrders from "./AdminOrders";

export default function AdminDashboard() {
  const data = [
    { month: "Jan", income: 5000 },
    { month: "Feb", income: 6200 },
    { month: "Mar", income: 4800 },
    { month: "Apr", income: 7100 },
    { month: "May", income: 5500 },
    { month: "Jun", income: 4000 },
    { month: "Jul", income: 6000 },
    { month: "Aug", income: 4500 },
    { month: "Sep", income: 7000 },
    { month: "Oct", income: 5000 },
    { month: "Nov", income: 4000 },
    { month: "Dec", income: 6000 },
  ];

  

  const config = {
    data,
    xField: "month",
    yField: "income",
    label: {
      position: "middle",
      style: {
        opacity: 1,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      income: {
        alias: "Income",
      },
      month: {
        alias: "Month",
      },
    },
  };

  return (
    <div>
      <h3 className="mb-4 font-bold">Dashboard</h3>
      <div className="flex md:flex-row flex-col w-full justify-between items-center gap-3">
        <div className="flex bg-white w-full justify-between items-end flex-grow p-3 rounded-md shadow-md">
          <div className="flex flex-col gap-3">
            <p className="">Total</p>
            <h3 className="mb-0 font-semibold">$1040</h3>
          </div>
          <div className="flex flex-col items-end">
            <h6 className="flex text-green-700 items-center gap-2 font-semibold">
              <FaArrowTrendUp />
              32%
            </h6>
            <p className="mb-0">Compared to april 2021</p>
          </div>
        </div>

        <div className="flex bg-white w-full justify-between items-end flex-grow p-3 rounded-md shadow-md">
          <div className="flex flex-col gap-3">
            <p className="">Total</p>
            <h3 className="mb-0 font-semibold">$1040</h3>
          </div>
          <div className="flex flex-col items-end">
            <h6 className="flex text-red-500 items-center gap-2 font-semibold">
              <FaArrowTrendDown />
              32%
            </h6>
            <p className="mb-0">Compared to april 2021</p>
          </div>
        </div>

        <div className="flex w-full bg-white justify-between items-end flex-grow p-3 rounded-md shadow-md">
          <div className="flex flex-col gap-3">
            <p className="">Total</p>
            <h3 className="mb-0 font-semibold">$1040</h3>
          </div>
          <div className="flex flex-col items-end">
            <h6 className="flex text-green-700 items-center gap-2 font-semibold">
              <FaArrowTrendUp />
              32%
            </h6>
            <p className="mb-0">Compared to april 2021</p>
          </div>
        </div>
      </div>

      {/* charts */}

      <div className="mt-4">
        <h3 className="mb-4 font-bold">Income Statistics</h3>
        <div className=" overflow-auto">
          <Column {...config} />
        </div>
      </div>

      {/* orders */}
      <div className="mt-4">
        <AdminOrders title={"Recent Orders"} fields={[]}  />
      </div>
    </div>
  );
}
