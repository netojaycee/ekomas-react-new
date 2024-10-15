import React, { useContext, useEffect, useState } from "react";
import {
  HeartIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
  ArrowLeftIcon,
} from "@heroicons/react/24/outline";
import { useParams, useNavigate } from "react-router-dom";
import { ProductContext } from "../components/Context/ProductContext";
import { RelatedProducts } from "../components/Products/RelatedProducts";
import { CartContext } from "../components/Context/CartContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faTrash } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartOutline } from "@fortawesome/free-regular-svg-icons";
import { WishContext } from "../components/Context/WishContext";
import { toast } from "react-toastify";
import ReactStars from "react-rating-stars-component";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";

function Icon({ id, open }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className={`${
        id === open ? "rotate-180" : ""
      } h-5 w-5 transition-transform`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
      />
    </svg>
  );
}

export function InstructionAccordion() {
  const [open, setOpen] = React.useState(0);

  const handleOpen = (value) => setOpen(open === value ? 0 : value);

  return (
    <>
      <Accordion open={open === 1} icon={<Icon id={1} open={open} />}>
        <AccordionHeader
          className="h-2 text-sm font-normal"
          onClick={() => handleOpen(1)}
        >
          Shipping & Returns
        </AccordionHeader>
        <AccordionBody>
          We&apos;re not always in the position that we want to be at.
          We&apos;re constantly growing. We&apos;re constantly making mistakes.
          We&apos;re constantly trying to express ourselves and actualize our
          dreams.
        </AccordionBody>
      </Accordion>
      <Accordion open={open === 2} icon={<Icon id={2} open={open} />}>
        <AccordionHeader
          className="h-2 text-sm font-normal"
          onClick={() => handleOpen(2)}
        >
          Payment
        </AccordionHeader>
        <AccordionBody>
          We&apos;re not always in the position that we want to be at.
          We&apos;re constantly growing. We&apos;re constantly making mistakes.
          We&apos;re constantly trying to express ourselves and actualize our
          dreams.
        </AccordionBody>
      </Accordion>
    </>
  );
}

export default function ProductDetails() {
  const { productId } = useParams();
  const { data } = useContext(ProductContext);
  const detail = data && data.find((p) => p._id === productId);


  const { addToCart } = useContext(CartContext);
  const { addToWish, removeFromWish, wish, clearWish } =
    useContext(WishContext);

  const [quantity, setQuantity] = useState(1);

  const isWish = detail && wish.some((item) => item._id === detail._id);

  const cartAdd = () => {
    addToCart(detail, productId, quantity);
    // toast.success(`${detail.name} added to cart`);
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
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };

  return (
    <>
      <div className="bg-white rounded-md shadow-md p-2 mt-3 w-[90%] mx-auto lg:w-[85%]">
        <ArrowLeftIcon onClick={handleBack} className="w-5 h-5 cursor-pointer" />
      </div>
      {detail && (
        <div className="flex flex-col gap-6 bg-gray-200">
          <div className="bg-white shadow-md p-5 flex flex-col lg:flex-row  gap-4 w-[90%] lg:w-[85%] mx-auto mt-5 ">
            <div className="flex flex-row p-2 pr-0 relative  border-r-2  rounded-md md:w-1/2 w-full justify-center items-center min-h-[250px]">
              {/* <div className="flex flex-row gap-3 relative "> */}
              {/* <div className=" rounded-lg object-cover "> */}
              <img
                src={detail.image}
                alt={detail.name}
                className="w-[150px] h-[150px] object-cover rounded-md"
              />
              {/* </div> */}
              {/* </div> */}
            </div>

            <div className="flex md:w-1/2 w-full flex-col gap-1">
              <div className="flex w-full items-center justify-between ">
                <h1 className="font-bold text-2xl">{detail.name}</h1>
              </div>
              <hr className=" border-2 border-[#b32b2b] w-full" />

              <div className="text-[#b32b2b] text-lg font-semibold flex items-center gap-1 ">
                <span>&#8358;</span>
                {detail.price}
              </div>
              {/* <ReactStars
                count={5}
                size={20}
                value={3}
                edit={false}
                activeColor="#ffd700"
              /> */}
              {/* <span className="text-gray-500 text-sm">
                <h2 className="text-black text-[16px] font-semibold ">
                  Category:{" "}
                </h2>{" "}
                {detail.category}
              </span> */}
              {/* <span className="text-gray-500 text-sm flex items-center gap-2">
                <h2 className="text-black text-[16px] font-semibold ">
                  Availability:{" "}
                </h2>
                <p className="">{detail.quantity} In stock</p>
              </span> */}

              <div className="flex flex-row items-center justify-center gap-3 mt-3">
                <div className="flex flex-row gap-2">
                  <button
                    className="py-2 px-3 border border-[#b32b2b] rounded flex items-center justify-center"
                    onClick={() => handleQuantityChange(-1)}
                  >
                    <ChevronLeftIcon className="w-4" />
                  </button>
                  <input
                  disabled={detail.quantity <= quantity}
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                    className="w-16 text-center border border-gray-300 rounded-md"
                  />
                <button
  disabled={detail.quantity <= quantity}
  className={`py-2 px-3 border border-[#b32b2b] rounded flex items-center justify-center ${
    detail.quantity <= quantity ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-[#b32b2b] text-white hover:bg-[#b32b2b]/80'
  }`}
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
              {/* <div
                onClick={toggleWish}
                className="flex items-center gap-1 cursor-pointer"
              >
                <FontAwesomeIcon
                  icon={isWish ? faHeart : faHeartOutline}
                  style={{ color: isWish ? "red" : "red" }}
                  size="lg"
                  className=""
                />
                <p className="text-sm">Add to wishlist</p>
              </div> */}
              <InstructionAccordion />
            </div>
          </div>

          {/* <div className="flex flex-col gap-1 w-[90%] lg:w-[55%] mx-auto">
                      <div className="text-black text-lg font-bold">Description</div>

          <div className="bg-white shadow-md shadow-gray-400 p-6 xl:min-h-[240px]">
            <p className="text-sm text-gray-500">{detail.description}</p>
          </div></div>
          <div className="flex flex-col gap-5 text-lg text-[#b32b2b]">
            <div className="w-[90%] lg:w-[55%] mx-auto">
              <h1>Related Products</h1>
              <hr className=" border-2 border-[#b32b2b] w-full " />
            </div>
            <div className="lg:w-[55%] w-full mx-auto">
              <RelatedProducts category={detail.category} itemsPerPage={5} />
            </div>
          </div> */}
        </div>
      )}
    </>
  );
}
