import React, { useContext, useState } from "react";
import SiteLayout from "../components/SiteLayout";
import { CartContext } from "../components/Context/CartContext";
import {
  MapPinIcon,
  MinusIcon,
  PlusIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";

export default function Cart() {
  const { cart, removeFromCart, increaseAmount, decreaseAmount, total } =
    useContext(CartContext);

  const handleRemoveItem = (id) => {
    removeFromCart(id);
  };

  const handleQuantityIncrease = (id) => {
    increaseAmount(id);
  };
  const handleQuantityDecrease = (id) => {
    decreaseAmount(id);
  };

  return (
    <SiteLayout>
      <div className="flex flex-col gap-6 mt-9">
        <section className="w-[80%] mx-auto flex flex-col gap-5 ">
          <div className="flex flex-row justify-between">
            <h1 className="text-2xl font-semibold text-secondary">Cart</h1>
            <h3 className="font-semibold flex items-center gap-2 text-primary">
              Add you address <MapPinIcon className="w-6" />
            </h3>
          </div>

          <div>
            <table className="w-full min-w-max table-auto text-center bg-white">
              <thead>
                <tr className="border-2 border-blue-gray-200">
                  {["Product", "Price", "Quantity", "Sub-Total", ""].map(
                    (head, index) => (
                      <th key={index} className="text-secondary p-4">
                        <Typography
                          variant="small"
                          className="font-bold leading-none"
                        >
                          {head}
                        </Typography>
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody>
                {cart.map((item, index) => {
                  const isLast = index === cart.length - 1;
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-b border-blue-gray-50";

                  return (
                    <tr key={item.id} className="border-2 border-blue-gray-200">
                      <td className={classes}>
                        <Typography variant="small" className="font-normal">
                          {item.name}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography variant="small" className="font-normal">
                          {item.price}
                        </Typography>
                      </td>
                      <td className="flex justify-center items-center gap-2 p-4">
                        <button
                          className="w-5 h-5"
                          onClick={() => handleQuantityDecrease(item.id)}
                        >
                          <MinusIcon className="w-full h-full" />
                        </button>
                        {item.amount}
                        <button
                          className="w-5 h-5"
                          onClick={() => handleQuantityIncrease(item.id)}
                        >
                          <PlusIcon className="w-full h-full" />
                        </button>
                      </td>
                      <td className={classes}>
                        <Typography variant="small" className="font-normal">
                          {item.amount * item.price}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          as="a"
                          href="#"
                          variant="small"
                          className="font-medium"
                          onClick={() => handleRemoveItem(item.id)}
                        >
                          <XMarkIcon className="w-5" />
                        </Typography>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
        <section className="w-full md:w-[50%] lg:w-[50%] xl:w-[25%] flex flex-col md:ml-[45%] lg:ml-[45%] xl:ml-[65%] p-10  md:mt-[70px]">
          <h1 className="text-2xl font-semibold">Cart Totals</h1>
          <div className="flex flex-col mt-3 gap-1">
            <div className="flex flex-row justify-between p-2 bg-white h-9">
              <h3 className="font-semibold ">Subtotal</h3>
              <h3 className="font-semibold ">
                $ {parseFloat(total).toFixed(2)}
              </h3>
            </div>
            <div className="flex flex-row p-2 justify-between bg-white h-9">
              <h3 className="font-semibold">Shipping</h3>
              <h3 className="font-semibold">0</h3>
            </div>
            <div className="flex flex-row justify-between p-2 bg-white h-9">
              <h3 className="font-semibold">Total</h3>
              <h3 className="font-semibold">
                {/* {cart.reduce((total, item) => total + item.amount * item.price, 0)} */}
                $ {parseFloat(total).toFixed(2)}
              </h3>
            </div>
          </div>
          <Link to="/checkout">
            <button className="bg-secondary text-white p-2 rounded-none mt-1 w-full">
              Proceed to Checkout
            </button>
          </Link>
        </section>
      </div>
    </SiteLayout>
  );
}
