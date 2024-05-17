import React, { useContext, useEffect, useState } from "react";
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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import {
  faMinusCircle,
  faPlusCircle,
  faX,
} from "@fortawesome/free-solid-svg-icons";

export default function Cart() {
  const {
    cart,
    removeFromCart,
    increaseAmount,
    decreaseAmount,
    total,
    clearCart,
    itemAmount,
  } = useContext(CartContext);

  const handleRemoveItem = (_id) => {
    removeFromCart(_id);
  };

  const handleQuantityIncrease = (_id) => {
    increaseAmount(_id);
  };
  const handleQuantityDecrease = (_id) => {
    decreaseAmount(_id);
  };

  useEffect(() => {
    console.log(cart);
  }, []);

  return (
    <div className="flex md:flex-row flex-col w-full gap-6 p-4 bg-gray-200">
      {cart && cart.length > 0 ? (
        <>
          <section className="md:w-[80%] w-full mx-auto flex flex-col gap-5 bg-white shadow-md shadow-gray-400  p-2 rounded-lg mt-3">
            <div className="flex flex-row justify-between">
              <h1 className="text-xl font-semibold text-secondary">
                Cart({cart.length})
              </h1>
              <h3
                onClick={clearCart}
                className="font-semibold flex items-center gap-2 text-primary cursor-pointer"
              >
                Clear Cart <FontAwesomeIcon icon={faTrashAlt} />
              </h3>
            </div>
            {/* <hr className="w-full" /> */}
            {cart.map((item, index) => (
              <div className="flex flex-col gap-2">
                <hr className="w-full " />

                <div className="flex flex-row justify-between">
                  <div className="flex flex-row gap-2">
                    <img
                      src={item.image}
                      alt=""
                      className="w-[70px] h-[70px]"
                    />
                    <div className="flex flex-col">
                      <p className="text-secondary text-sm font-[500]">
                        {item.name}
                      </p>
                      <p className="text-gray-400 font-semibold">
                        {item.inStock === true ? "in stock" : "out of stock"}
                      </p>
                    </div>
                  </div>
                  {/* add discount  */}
                  <div className="flex font-semibold">
                    ${parseFloat(item.price).toFixed(2)}
                  </div>
                  {/* add discount  */}
                </div>
                {/* <hr className="w-full " /> */}
                <div className="flex flex-row justify-between items-center">
                  <Typography
                    as="a"
                    href="#"
                    variant="small"
                    className=" text-red-500 font-semibold"
                    onClick={() => handleRemoveItem(item._id)}
                  >
                    <FontAwesomeIcon
                      icon={faTrashAlt}
                      size="lg"
                      style={{ color: "red" }}
                    />{" "}
                    Remove
                  </Typography>
                  <div className="flex gap-3">
                    <button
                      className="w-5 h-5"
                      onClick={() => handleQuantityDecrease(item._id)}
                    >
                      <FontAwesomeIcon
                        icon={faMinusCircle}
                        size="lg"
                        style={{ color: "red" }}
                      />
                    </button>
                    {item.amount}
                    <button
                      className="w-5 h-5"
                      onClick={() => handleQuantityIncrease(item._id)}
                    >
                      <FontAwesomeIcon
                        icon={faPlusCircle}
                        size="lg"
                        style={{ color: "green" }}
                      />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </section>
          <section className="w-full mx-auto md:w-[30%] flex flex-col shadow-md shadow-gray-400 bg-white p-2 rounded-lg mt-3 h-[200px]">
            {/* <h1 className="text-2xl font-semibold">Cart Totals</h1> */}
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
            <Link to={"/checkout"} state={{ fromCart: true }}>
              <button className="bg-secondary text-white p-2 rounded-none mt-1 w-full">
                Proceed to Checkout
              </button>
            </Link>
          </section>
        </>
      ) : (
        <div className="w-[90%] mx-auto flex flex-col gap-5 bg-white shadow-md shadow-gray-400  p-2 rounded-lg mt-3 items-center justify-center">
          <img src="" alt="" className="" />
          <h1 className="text-2xl font-semibold">Cart is Empty</h1>
          <p className="text-gray-500">Add items to your cart to checkout</p>
          <Link
            className="py-2 px-3 bg-secondary text-white rounded-none text-center"
            to={"/products"}
          >
            Start Shopping
          </Link>
        </div>
      )}
    </div>
  );
}
