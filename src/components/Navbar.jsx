import React, { useState } from "react";
import {
  Typography,
  IconButton,
  Button,
  Drawer,
} from "@material-tailwind/react";
import {
  Bars3Icon,
  UserIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/outline";
import logo from "../assets/images/logo.png";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "./Context/CartContext";
import Searchbox from "./seachbox";
import AuthContext from "./Context/AuthContext";
import { BiHeart } from "react-icons/bi";
import { WishContext } from "./Context/WishContext";
import { Sidebar } from "./Products/ProductsList";
import { CategoryContext } from "./Context/CategoryContext";

export default function Nav() {
  const [openNav, setOpenNav] = React.useState(false);

  const handleWindowResize = () =>
    window.innerWidth >= 960 && setOpenNav(false);

  React.useEffect(() => {
    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);
  const { itemAmount } = useContext(CartContext);
  const { auth } = useContext(AuthContext);
  const { categoriesData } = useContext(CategoryContext);

  const { wish } = useContext(WishContext);
  const [open, setOpen] = useState(false);

  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);

  return (
    <>
      <div className="bg-white shadow-md sticky top-0 z-40 w-full py-3 ">
        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center justify-between px-4 py-3 w-[90%] mx-auto">
            {/* <div className="flex items-center gap-6 w-full"> */}
              {/* <Bars3Icon
                onClick={openDrawer}
                className="h-6 w-6 cursor-pointer lg:hidden "
                strokeWidth={2}
              /> */}

              <Link to="/" className="w-full">
                <img src={logo} alt="logo" className="w-[50%] md:w-[40%] object-cover" />
              </Link>
            {/* </div> */}

            <div className="hidden md:flex items-center justify-between gap-10">
              <Link
                to="/products"
                className="duration-300 transform hover:scale-125 transition ease-linear hover:underline"
              >
                Products{" "}
              </Link>
              <span
                onClick={openDrawer}
                className="duration-300 transform hover:scale-125 transition ease-linear hover:underline mr-3"
              >
                Categories{" "}
              </span>
            </div>
            <div className="hidden md:flex w-full justify-center items-center gap-4">
              <Searchbox placeholder="Search for all items here..." />
            </div>
            <div className="relative md:flex gap-4 right-1 flex justify-start px-2 md:justify-between  w-[25%] items-center">
              <Link to="/user/saved-items">
                <div className="relative">
                  <BiHeart className="w-6 h-6 duration-300 transform hover:scale-125 transition ease-linear" />
                  <span className="bg-secondary text-white text-[10px] rounded absolute top-[-3px] right-[-3px] px-[4px] py-0">
                    {wish && wish.length > 0 ? wish.length : 0}
                  </span>
                </div>
              </Link>
              <Link to="/cart">
                <div className="relative">
                  <ShoppingCartIcon className="w-6 duration-300 transform hover:scale-125 transition ease-linear" />
                  <span className="bg-secondary text-white text-[10px] rounded absolute top-[-3px] right-0 px-[4px] py-0">
                    {itemAmount}
                  </span>
                </div>
              </Link>
              <Link to={auth?.user ? "/user/dashboard" : "/login"}>
                <UserIcon className="w-6  duration-300 transform hover:scale-125 transition ease-linear" />
              </Link>
            </div>
          </div>
          <div className="flex lg:hidden w-[90%] mx-auto justify-center items-center gap-4">
            <Searchbox placeholder="Search for all items here..." />
          </div>
        </div>
      </div>

      <Sidebar
        openDrawer={openDrawer}
        closeDrawer={closeDrawer}
        open={open}
        categoriesData={categoriesData}
        // handleInStock={handleInStock}
        // handlePriceRangeChange={handlePriceRangeChange}
      />
    </>
  );
}
