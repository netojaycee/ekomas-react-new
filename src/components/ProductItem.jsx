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
import { CartContext } from "./Context/CartContext";

const ProductItem = ({
  _id,
  name,
  price,
  image,
  discount,
  classx,
  category,
  cartButton,
}) => {
  const productDetailPath = `/product/${_id}`;

  const { addToWish, removeFromWish, wish, clearWish } =
    useContext(WishContext);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    Aos.init();
  }, []);

  const cartAdd = () => {
    addToCart(_id, 1);
    toast.success(`${name} added to cart`);
  };

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

  const discountPrice = (price * discount) / 100;

  return (
    <div
      key={_id}
      className={`flex flex-col bg-gray-300 border border-gray-400 md:max-w-[200px] overflow-hidden  rounded-xl ${(classx =
        "p-1")} xl:max-w-full ${
        cartButton === true ? "h-[330px]" : "h-[280px]"
      }`}
    >
      <div className="flex flex-row gap-4 rounded ">
        <div className="bg-white flex flex-row justify-center rounded overflow-hidden h-[200px] relative w-full duration-300 transform hover:scale-105 transition ease-linear">
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
              {discount > 0 && (
                <div className="bg-badge text-center pl-2 px-3 relative right-3">
                  -{discount}%
                </div>
              )}
            </div>
            <div className="bg-badge h-5 w-5 rounded-l-md relative ml-[30px] mt-28"></div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-1 mx-auto w-[97%] h-[100px]">
        <p className="text-sm mt-1 text-gray-900 font-semibold max-h-[25%] w-[90%] overflow-hidden text-ellipsis whitespace-nowrap">
          {name}
        </p>
        <div className="flex flex-row justify-between rounded items-center">
          <div className="flex flex-col gap-1">
            {cartButton === true && (
              <div className="mt-1 text-[#b32b2b] text-sm lg-text-lg md:text-md flex items-center gap-1">
                <ReactStars
                  count={5}
                  size={20}
                  value={3}
                  edit={false}
                  activeColor="#ffd700"
                />
                (2)
              </div>
            )}
            <div className="text-black text-sm flex flex-col">
              {discount > 0 ? (
                <>
                  <span className="flex items-center gap-1">
                    <span>&#8358;</span>
                    {parseFloat(discountPrice).toFixed(2)}
                  </span>
                </>
              ) : (
                <span className="flex items-center gap-1">
                  <span>&#8358;</span>
                  {parseFloat(price).toFixed(2)}
                </span>
              )}
              {discount > 0 && (
                <span className="text-xs text-gray-500 line-through">
                  <span className="flex items-center gap-1">
                    <span>&#8358;</span>
                    {parseFloat(price).toFixed(2)}
                  </span>
                </span>
              )}
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
      {cartButton === true && (
        <button
          onClick={() => cartAdd()}
          className="transition transform duration-300 ease-in-out focus:outline-none bg-[#b32b2b] hover:bg-secondary text-white rounded font-semibold py-1 text-sm  cursor-pointer"
        >
          ADD TO CART
        </button>
      )}
    </div>
  );
};

export default ProductItem;
