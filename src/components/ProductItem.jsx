// FeaturedProductItem.js
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { HeartIcon } from "@heroicons/react/24/outline";
import Aos from "aos";
import { WishContext } from "./Context/WishContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faTrash } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartOutline } from "@fortawesome/free-regular-svg-icons";
import { toast } from "react-toastify";
import ReactStars from "react-rating-stars-component";

const ProductItem = ({
  _id,
  name,
  price,
  image,
  discount,
  classx,
  category,
}) => {
  const productDetailPath = `/product/${_id}`;

  const { addToWish, removeFromWish, wish, clearWish } =
    useContext(WishContext);

  useEffect(() => {
    Aos.init();
  }, []);

  const isWish = wish.some((item) => item._id === _id);

  const toggleWish = () => {
    if (!isWish) {
      addToWish(
        {
          _id,
          name,
          price,
          image,
          discount,
          classx,
          category,
        },
        _id
      );
      toast.success(`${name} added to wishlist`);
    } else {
      removeFromWish(_id);
      toast.success(`${name} removed from wishlist`);
    }
  };

  return (
    <div
      key={_id}
      className={`flex flex-col gap-2 bg-gray-300 border border-gray-400 md:max-w-[200px] overflow-hidden  rounded-xl ${classx} xl:max-w-full h-[300px]`}
    >
      <div className="flex flex-row gap-4 rounded ">
        <div className="bg-white flex flex-row rounded overflow-hidden h-[200px] relative w-full p-2 duration-300 transform hover:scale-105 transition ease-linear">
          <Link to={productDetailPath}>
            <img
              src={image}
              alt={name}
              className="w-full object-cover rounded-t-lg h-full"
            />
          </Link>
          {/* <span
    className="hidden group-hover:block text-base absolute bottom-0 left-0 right-0 py-1 px-8 text-center bg-gray-300 text-red-900 border-b-2 border-secondary"
  >
    Shop Now
  </span> */}
          <div className="-right-2 rounded absolute " data-aos="fade-up">
            <div className="absolute -right-1">
              {discount !== 0 && (
                <div className="bg-badge text-center pl-2 px-3 relative right-3">
                  ${discount}
                </div>
              )}
            </div>
            <div className="bg-badge h-5 w-5 rounded-l-md relative ml-[30px] mt-28"></div>
          </div>
        </div>
      </div>
      <div className="flex flex-col px-2 gap-1">
        <p className="text-sm text-gray-900 font-semibold h-8">{name}</p>
        <div className="flex flex-row justify-between rounded items-center">
          <div className="flex flex-col gap-1">
            <div className="mt-1 text-[#b32b2b] text-sm lg-text-lg md:text-md">
              <ReactStars
                count={5}
                size={20}
                value={3}
                edit={false}
                activeColor="#ffd700"
              />
            </div>
            <div className="text-black text-sm">
              ${parseFloat(price).toFixed(2)}
            </div>
          </div>
          <div className="flex justify-end">
            <FontAwesomeIcon
              icon={isWish ? faHeart : faHeartOutline}
              style={{ color: isWish ? "red" : "red" }}
              size="lg"
              className="cursor-pointer"
              onClick={toggleWish}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
