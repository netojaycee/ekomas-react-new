import React, { useContext, useState } from "react";

import OrderImage from "../../assets/images/order.png";
import { WishContext } from "../../components/Context/WishContext";
import { remove } from "@ant-design/plots/es/core/utils";
import { TrashIcon } from "@heroicons/react/24/outline";
import emptywish from "../../assets/images/emptywish.png";

export default function SavedItems() {
  const { removeFromWish, wish, clearWish } = useContext(WishContext);
  return (
    <div className="flex-col flex w-full h-[90%] px-4 overflow-y-auto">
      <div>
        <h2 className="text-2xl">Saved Items</h2>
      </div>
      <hr className="w-full mt-2 border border-primary" />
      <div className="flex justify-end mt-2 mr-4">
        <button
          onClick={clearWish}
          className="flex items-center gap-2 font-semibold text-primary"
        >
          <TrashIcon className="h-6 w-6" /> Clear wish
        </button>
      </div>
      <div className="">
        {wish.lenght > 0 ? (
          <div className="grid grid-cols-2 my-4 gap-4 w-full">
            {wish.map((item) => (
              <>
                <div className="flex flex-col">
                  <div className="lg:flex-row flex flex-col lg:justify-between h-[300px] overflow-auto lg:h-[150px] my-8 p-4 border gap-3 lg:gap-x-10 items-center">
                    <div className="md:flex-row flex flex-col gap-4 w-full lg:w-2/3">
                      <div className="object-contain p-3 border rounded flex-3 ">
                        <img
                          src={item.image}
                          className="h-20 w-30"
                          alt="image"
                        />
                      </div>
                      <div className="flex flex-col lg:gap-6">
                        <h2 className="text-black font-bold">{item.name}</h2>
                        <p className="font-bold text-lg">
                          {" "}
                          &#8358; {item.price}
                        </p>
                      </div>
                    </div>
                    <div className="btn w-full lg:w-1/3 flex flex-col justify-center md:justify-end items-center gap-4">
                      <button className="bg-black text-sm lg:text-xs font-bold text-white px-4 py-2 rounded-md w-full">
                        Add to cart
                      </button>
                      <button
                        onClick={removeFromWish}
                        className="bg-primary text-sm font-bold text-white px-4 py-2 rounded-md w-full"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                  <hr className="border-primary border" />
                </div>
              </>
            ))}
          </div>
        ) : (
          <>
            <div className="flex flex-col items-center justify-center w-full gap-3">
              <img
                src={emptywish}
                alt="Empty Wishlist"
                className=""
              />
              <p className="text-2xl font-semibold text-center">
                Your wishlist is empty
              </p>
              <p className="text-gray-700 text-justify text-sm">
                Add some products to your wishlist
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
