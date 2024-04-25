import React, { useContext, useEffect, useState } from "react";
import {
  HeartIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
} from "@heroicons/react/24/outline";
import { useParams } from "react-router-dom";
import { ProductContext } from "../components/Context/ProductContext";
import { RelatedProducts } from "../components/Products/RelatedProducts";
import { CartContext } from "../components/Context/CartContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faTrash } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartOutline } from "@fortawesome/free-regular-svg-icons";
import { WishContext } from "../components/Context/WishContext";
import { toast } from "react-toastify";




export default function ProductDetails() {
  const { productId } = useParams();
  const { data } = useContext(ProductContext);
  const detail = data && data.find((p) => p._id === productId);

  useEffect(() => {
    console.log("test", detail);
  }, [detail]);

  const { addToCart } = useContext(CartContext);
  const { addToWish, removeFromWish, wish, clearWish } =
    useContext(WishContext);

  const [quantity, setQuantity] = useState(1);

  const isWish = detail && wish.some((item) => item._id === detail._id);

  const cartAdd = () => {
    addToCart(detail, productId, quantity);
    toast.success(`${detail.name} added to cart`);
  };

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity < 1) {
      return;
    }
    setQuantity(newQuantity);
  };

  const toggleWish = () => {
    if (detail) {
      const { _id, name, price, image, discount, classx, category } = detail;
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
    }
  };

  return (
    <>
      {detail && (
        <div className="flex flex-col gap-6">
          <div className="flex flex-col lg:flex-row  gap-6 w-[90%] md:w-[80%] mx-auto mt-9 lg:h-[300px]">
            <div className="bg-white flex flex-row p-2 pr-0 relative overflow-auto shadow-md object-contain border rounded-md flex-1 justify-center items-center">
              <div className="flex flex-row gap-5 relative overflow-auto object-contain">
                <div className="my-2 p-4 rounded-xl object-cover overflow-auto">
                  <img
                    src={detail.image}
                    alt={detail.name}
                    className=" object-cover rounded-md md:w-[700px] md:h-[250px] w-[4000px] h-[200px]"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-1 w-full flex-col gap-4">
              <div className="flex w-full items-center justify-between">
                <h1>{detail.name}</h1>
                <div className="">
                  <FontAwesomeIcon
                    icon={isWish ? faHeart : faHeartOutline}
                    style={{ color: isWish ? "red" : "red" }}
                    size="lg"
                    className="cursor-pointer"
                    onClick={toggleWish}
                  />{" "}
                </div>
              </div>
              <div className="text-[#b32b2b] text-xl font-semibold">
                {detail.price}
              </div>
              <hr className="mb-4 border-2 border-[#b32b2b] w-full" />
              <div className="text-black text-sm font-semibold">Details</div>
              <p className="text-gray-600 mt-3 h-[50%]">
                {detail.description}
              </p>

              <div className="flex flex-row items-center justify-center gap-3 mt-3">
                <div className="flex flex-row gap-2">
                  <button
                    className="py-2 px-3 border border-[#b32b2b] rounded flex items-center justify-center"
                    onClick={() => handleQuantityChange(-1)}
                  >
                    <ChevronLeftIcon className="w-4" />
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) =>
                      setQuantity(parseInt(e.target.value) || 1)
                    }
                    className="w-16 text-center border border-gray-300 rounded-md"
                  />
                  <button
                    className="py-2 px-3 border border-[#b32b2b]  rounded flex items-center justify-center"
                    onClick={() => handleQuantityChange(1)}
                  >
                    <ChevronRightIcon className="w-4" />
                  </button>
                </div>

                <button
                  onClick={() => cartAdd()}
                  className="bg-[#b32b2b] hover:bg-secondary text-white rounded font-bold py-2 w-[60%] cursor-pointer"
                >
                  Add to cart
                </button>
              </div>
            </div>
          </div>
          <div className="md:mt-40 mt-20 flex flex-col gap-5 text-xl text-[#b32b2b]">
            <div className="w-[80%] mx-auto">
              <h1>Related Products</h1>
              <hr className="mb-4 border-2 border-[#b32b2b] w-full" />
            </div>
            <div>
              <RelatedProducts category={detail.category} itemsPerPage={5} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
