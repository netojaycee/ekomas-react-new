// FeaturedProductItem.js
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { HeartIcon } from "@heroicons/react/24/outline";
import Aos from "aos";
import { WishContext } from "./Context/WishContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartOutline } from "@fortawesome/free-regular-svg-icons";

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

  const { addToWish, removeFromWish, wish } = useContext(WishContext);
  const [isInWishList, setIsInWishList] = useState(false);

  useEffect(() => {
    Aos.init();
  }, []);

  useEffect(() => {
    setIsInWishList(wish && wish.some((item) => item._id === _id));
  }, [wish, _id]);

  const handleWishClick = () => {
    if (isInWishList) {
      removeFromWish(_id);
    } else {
      addToWish(_id);
    }
  };

  return (
    <div
      key={_id}
      className={`flex flex-col gap-4 bg-gray-300 border border-gray-400 md:max-w-[250px] overflow-hidden  rounded-xl  ${classx} xl:max-w-full justify-center`}
    >
      <div className="flex flex-row gap-4 rounded ">
        <div className="bg-white flex flex-row p-2 rounded overflow-hidden pr-0 relative w-full h-[200px] duration-300 transform hover:scale-105 transition ease-linear">
          <div className="top-4 left-3 absolute">
            <FontAwesomeIcon
              icon={isInWishList ? faHeart : faHeartOutline}
              style={{ color: isInWishList ? "red" : "gray" }}
              size="lg"
              className="cursor-pointer"
              onClick={handleWishClick}
            />
          </div>
          <div
            className="group flex justify-center items-center h-32 w-full bg-white px-4 py-2"
            data-aos="zoom-out"
          >
            <Link to={productDetailPath} className="my-2 w-full">
              <img
                src={image}
                alt={name}
                className="w-32 h-32 mx-auto object-cover "
                style={{ maxHeight: "100%" }}
              />
            </Link>
            <a href={productDetailPath} className="hidden group-hover:block text-xs absolute bottom-0 left-0 right-0 py-1 px-8 text-center bg-red-500 text-white border-b-2 border-secondary">Shop Now</a>
            <a
              href="#"
              className="hidden group-hover:block text-xs text-base absolute bottom-0 left-0 right-0 py-1 px-8 text-center bg-gray-300 text-red-900 border-b-2 border-secondary"
            >
              Shop Now
            </a>
          </div>

          <div className=" -right-2 rounded absolute " data-aos="fade-up">
            <div className="absolute -right-1">
              {discount !== 0 && (
                <div className="bg-badge text-center pl-2 px-3 relative right-3">
                  ${discount}
                </div>
              )}
            </div>
            <div className="bg-badge h-5 w-3 rounded-l-md relative ml-[30px] mt-28"></div>
          </div>
        </div>
      </div>

      <div className="flex flex-col px-4 gap-1" data-aos="zoom-in">
        <div className="mt-1 text-[#b32b2b] text-sm lg-text-lg md:text-md">
          {name}
        </div>
        <div className="text-gray-600 sm:text-sm md:text-lg">${price}</div>
      </div>
    </div>
  );
};

export default ProductItem;
