import React, { useContext } from "react";
import {
  Drawer,
  Button,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import ProductItem from "./ProductItem";
import { WishContext } from "./Context/WishContext";
import emptywish from "../assets/images/emptywish.png";

export default function Wishlist() {
  const [open, setOpen] = React.useState(false);
  const { wish } = useContext(WishContext);

  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);

  return (
    <React.Fragment>
      <FontAwesomeIcon
        icon={faHeart}
        color="black"
        size="lg"
        className="cursor-pointer duration-300 transform hover:scale-125 transition ease-linear"
        onClick={openDrawer}
      />
      <Drawer
        placement="right"
        open={open}
        onClose={closeDrawer}
        className="p-4 bg-secondary"
      >
        <div className="mb-6 flex items-center justify-between bg-white p-2">
          <Typography variant="h5" color="blue-gray" className="font-inter font-semibold ">
            WishList
          </Typography>
          <IconButton
            variant="text"
            color="blue-gray"
            onClick={closeDrawer}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </IconButton>
        </div>
        <>
        <div
        className="overflow-y-auto"
        style={{ maxHeight: "calc(100vh - 100px)" }}
      >
      <div className="flex p-3">
        {wish.length > 0 && ( // Check if the wishlist is not empty
          <div className="grid grid-cols-1 gap-3">
            {wish.map((item) => (
              <div key={item._id} className="flex flex-col">
                <ProductItem key={item._id} {...item} />
              </div>
            ))}
          </div>
        )}
      </div>

      {wish.length === 0 && (
        <div className="flex flex-col items-center justify-center w-full h-screen bg-white gap-3">
          <img
            src={emptywish}
            alt="Empty Wishlist"
            className="w-[50%] object-cover"
          />
          <p className="text-2xl font-semibold text-center">Your wishlist is empty</p>
          <p className="text-gray-700 text-justify text-sm">Add some products to your wishlist</p>
        </div>
      )}</div>
    </>
      </Drawer>
    </React.Fragment>
  );
}
