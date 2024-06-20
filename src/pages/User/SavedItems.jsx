import React, { useState, useEffect } from "react";
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

export default function SavedItems() {
  const [errors, setErrors] = useState({});
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState("all");

  return (
    <div className="flex-col flex w-full h-[90%] px-4 overflow-y-auto">
      <div>
        <h2 className="text-2xl">Saved Items</h2>
      </div>
      <hr className="w-full mt-2" />
      <div className="grid grid-cols-2 my-4 gap-4">
        <div className="lg:flex-row flex flex-col lg:justify-between h-[300px] overflow-auto lg:h-[150px] my-8 p-4 border gap-3 lg:gap-x-10 items-center">
          <div className="md:flex-row flex flex-col gap-4 w-full lg:w-2/3">
            <div className="object-contain p-3 border rounded flex-3 ">
              <img src={OrderImage} className="h-20 w-30" alt="image" />
            </div>
            <div className="flex flex-col lg:gap-6">
              <h2 className="text-black font-bold">
                product name
              </h2>
              <p className="font-bold text-lg">$200</p>
            </div>
          </div>
          <div className="btn w-full lg:w-1/3 flex flex-col justify-center md:justify-end items-center gap-4">
            <button className="bg-black text-sm lg:text-xs font-bold text-white px-4 py-2 rounded-md w-full">
              Add to cart
            </button>
            <button className="bg-primary text-sm font-bold text-white px-4 py-2 rounded-md w-full">
              Remove
            </button>
          
          </div>
        </div>
        {/* <hr /> */}


        <div className="lg:flex-row flex flex-col lg:justify-between h-[300px] overflow-auto lg:h-[150px] my-8 p-4 border gap-3 lg:gap-x-10 items-center">
          <div className="md:flex-row flex flex-col gap-4 w-full lg:w-2/3">
            <div className="object-contain p-3 border rounded flex-3 ">
              <img src={OrderImage} className="h-20 w-30" alt="image" />
            </div>
            <div className="flex flex-col lg:gap-6">
              <h2 className="text-black font-bold">
                product name
              </h2>
              <p className="font-bold text-lg">$200</p>
            </div>
          </div>
          <div className="btn w-full lg:w-1/3 flex flex-col justify-center md:justify-end items-center gap-4">
            <button className="bg-black text-sm lg:text-xs font-bold text-white px-4 py-2 rounded-md w-full">
              Add to cart
            </button>
            <button className="bg-primary text-sm font-bold text-white px-4 py-2 rounded-md w-full">
              Remove
            </button>
          
          </div>
        </div>
        <hr />
        <hr />


        <div className="lg:flex-row flex flex-col lg:justify-between h-[300px] overflow-auto lg:h-[150px] my-8 p-4 border gap-3 lg:gap-x-10 items-center">
          <div className="md:flex-row flex flex-col gap-4 w-full lg:w-2/3">
            <div className="object-contain p-3 border rounded flex-3 ">
              <img src={OrderImage} className="h-20 w-30" alt="image" />
            </div>
            <div className="flex flex-col lg:gap-6">
              <h2 className="text-black font-bold">
                product name
              </h2>
              <p className="font-bold text-lg">$200</p>
            </div>
          </div>
          <div className="btn w-full lg:w-1/3 flex flex-col justify-center md:justify-end items-center gap-4">
            <button className="bg-black text-sm lg:text-xs font-bold text-white px-4 py-2 rounded-md w-full">
              Add to cart
            </button>
            <button className="bg-primary text-sm font-bold text-white px-4 py-2 rounded-md w-full">
              Remove
            </button>
          
          </div>
        </div>
        {/* <hr /> */}


        <div className="lg:flex-row flex flex-col lg:justify-between h-[300px] overflow-auto lg:h-[150px] my-8 p-4 border gap-3 lg:gap-x-10 items-center">
          <div className="md:flex-row flex flex-col gap-4 w-full lg:w-2/3">
            <div className="object-contain p-3 border rounded flex-3 ">
              <img src={OrderImage} className="h-20 w-30" alt="image" />
            </div>
            <div className="flex flex-col lg:gap-6">
              <h2 className="text-black font-bold">
                product name
              </h2>
              <p className="font-bold text-lg">$200</p>
            </div>
          </div>
          <div className="btn w-full lg:w-1/3 flex flex-col justify-center md:justify-end items-center gap-4">
            <button className="bg-black text-sm lg:text-xs font-bold text-white px-4 py-2 rounded-md w-full">
              Add to cart
            </button>
            <button className="bg-primary text-sm font-bold text-white px-4 py-2 rounded-md w-full">
              Remove
            </button>
          
          </div>
        </div>
        <hr />
        <hr />
      </div>
    </div>
  );
}
