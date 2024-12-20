// FeaturedProductItem.js
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { HeartIcon, ShoppingCartIcon } from "@heroicons/react/24/outline";
import Aos from "aos";
import { WishContext } from "./Context/WishContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faTrash } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartOutline } from "@fortawesome/free-regular-svg-icons";
import { toast } from "react-toastify";
import ReactStars from "react-rating-stars-component";
import { CartContext } from "./Context/CartContext";

const ProductItem = ({ item, cartButton }) => {
  const { _id, name, price, image, discount, category } = item;

  const productDetailPath = `/product/${_id}`;

  const { addToWish, removeFromWish, wish, clearWish } =
    useContext(WishContext);
  const { addToCart, itemAmount } = useContext(CartContext);

  useEffect(() => {
    Aos.init();
  }, []);

  const cartAdd = () => {
    addToCart(item, _id, 1);
    // toast.success(`${name} added to cart`);
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
    //   <div
    //     key={_id}
    //     className={`flex flex-col bg-white  overflow-hidden  rounded-xl p-1
    //      `}
    //   >
    //     <div className="flex flex-row gap-4 rounded ">
    //       <div className="bg-white flex flex-row justify-center rounded overflow-hidden relative w-full duration-300 transform hover:-scale-x-105 transition ease-linear">
    //         <Link to={productDetailPath}>
    //           <img
    //             src={image}
    //             alt={name}
    //             className="w-[100px] h-[100px] object-cover rounded-t-lg"
    //           />
    //         </Link>
    //         {/* <span
    //   className="hidden group-hover:block text-base absolute bottom-0 left-0 right-0 py-1 px-8 text-center bg-gray-300 text-red-900 border-b-2 border-secondary"
    // >
    //   Shop Now
    // </span> */}
    //         <div className="-right-2 rounded absolute " data-aos="fade-up">
    //           {/* <div className="absolute -right-1">
    //             {discount > 0 && (
    //               <div className="bg-badge text-center pl-2 px-3 relative right-3">
    //                 -{discount}%
    //               </div>
    //             )}
    //           </div> */}
    //           <div className="bg-badge h-5 w-5 rounded-l-md relative ml-[30px] mt-28"></div>
    //         </div>
    //       </div>
    //     </div>
    //     <div className="flex flex-col mx-auto w-[97%] gap-3">
    //       <p className="text-sm text-center text-gray-900  w-[90%] overflow-hidden line-clamp-1 mt-1">
    //         {name}
    //       </p>
    //       <div className="flex flex-row justify-center rounded items-center">
    //         <div className="flex flex-col gap-1 ">
    //           {/* {cartButton === true && (
    //             <div className="mt-1 text-[#b32b2b] text-sm lg-text-lg md:text-md flex items-center gap-1">
    //               <ReactStars
    //                 count={5}
    //                 size={20}
    //                 value={3}
    //                 edit={false}
    //                 activeColor="#ffd700"
    //               />
    //               (2)
    //             </div>
    //           )} */}
    //           <div className="text-black text-sm justify-center flex flex-col w-full">
    //             {/* {discount > 0 ? (
    //               <>
    //                 <span className="flex items-center gap-1">
    //                   <span>&#8358;</span>
    //                   {parseFloat(discountPrice).toFixed(2)}
    //                 </span>
    //               </>
    //             ) : (
    //               <span className="flex items-center gap-1">
    //                 <span>&#8358;</span>
    //                 {parseFloat(price).toFixed(2)}
    //               </span>
    //             )}
    //             {discount > 0 && (
    //               <span className="text-xs text-gray-500 line-through">
    //                 <span className="flex items-center gap-1">
    //                   <span>&#8358;</span>
    //                   {parseFloat(price).toFixed(2)}
    //                 </span>
    //               </span>
    //             )} */}

    //             <span className="flex justify-center items-center gap-1 font-semibold">
    //               <span>&#8358;</span>
    //               {parseFloat(price).toFixed(2)}
    //             </span>
    //           </div>
    //         </div>
    // {/* <div className="flex justify-end">
    //   <FontAwesomeIcon
    //     icon={isWish ? faHeart : faHeartOutline}
    //     style={{ color: isWish ? "red" : "red" }}
    //     size="lg"
    //     className="cursor-pointer"
    //     onClick={toggleWish}
    //   />
    // </div> */}
    //       </div>
    //     </div>
    //     {/* {cartButton === true && ( */}
    //     <button
    //       onClick={() => cartAdd()}
    //       className="mt-2 transition transform duration-300 ease-in-out focus:outline-none bg-[#b32b2b] hover:bg-secondary text-white rounded font-semibold py-1 text-sm  cursor-pointer"
    //     >
    //       ADD TO CART
    //     </button>
    //     {/* // )} */}
    //   </div>

    <div className="flex flex-col  ">
      <div className="relative group hover:shadow-lg hover:shadow-red-300 bg-white p-5 flex items-center justify-center rounded-md">
        <Link to={productDetailPath}>
          <img
            src={image}
            alt={name}
            className="duration-300 transform hover:-scale-x-105 transition ease-linear w-[209px] h-[209px] object-contain"
          />
        </Link>
        <div className="absolute top-5 left-5">
          <FontAwesomeIcon
            icon={isWish ? faHeart : faHeartOutline}
            style={{ color: "red" }}
            size="lg"
            className="cursor-pointer"
            onClick={toggleWish}
          />
        </div>

        {/* Shop Now Button */}
        <span className="absolute bottom-3 right-0 transform  transition-all duration-500 ease-in-out h-6 py-1 rounded-tl-md rounded-bl-md px-1 group-hover:px-3 text-center bg-badge text-black">
          <p className="hidden group-hover:block text-xs">Shop Now</p>
        </span>
      </div>
      <div className="flex justify-between items-center p-1">
        <div className="flex flex-col">
          <h2 className="text-[10px] md:text-[14px] text-black font-semibold line-clamp-1 overflow-hidden">
            {name}
          </h2>
          <h2 className="text-[8px] md:text-[12px] text-[rgba(37, 37, 37, 0.63)]">
            <span className="flex items-center gap-1">
              <span>&#8358;</span>
              {parseFloat(price).toFixed(2)}
            </span>{" "}
          </h2>
        </div>

        <ShoppingCartIcon
          onClick={() => cartAdd()}
          className="w-7 h-7 cursor-pointer"
        />
      </div>
    </div>
  );
};

export default ProductItem;
