import React, { useState, useContext } from "react";
import {
  Navbar,
  Collapse,
  Typography,
  IconButton,
  Input,
  Button,
} from "@material-tailwind/react";
import {
  Bars3Icon,
  XMarkIcon,
  MagnifyingGlassIcon,
  InformationCircleIcon,
  UserIcon,
  ShoppingCartIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import logo from "../assets/images/logo.png";
import { Link } from "react-router-dom";
// import { ProductContext } from "./Context/ProductContext";
// import { CartContext } from "./Context/CartContext";
import Searchbox from "./seachbox";
import NavListMenu from "./NavListMenu";

function NavList() {
  return (
    <>
      <div className="relative flex flex-col md:flex-row w-full items-left md:items-center gap-4 justify-between  z-50 text-white">
        <ul className="my-2 flex flex-col md:gap-2 lg:mb-0 lg:mt-0 md:flex-row lg:items-center lg:gap-[50px] mx-3 ">
          <Typography
            as="li"
            variant="medium"
            className="p-1 font-medium  duration-300 transform hover:scale-25 transition ease-linear"
          >
            <Link
              to="/all-product"
              className="flex items-center hover:text-secondary transition-colors"
            >
              Products
            </Link>
          </Typography>
          <Typography
            as="li"
            variant="medium"
            className="p-1 font-medium z-10 duration-300 transform hover:scale-25 transition ease-linear "
          >
            <span className="flex items-center relative cursor-pointer">
              <NavListMenu />
            </span>
            {/* Dropdown Content */}
          </Typography>
        </ul>
        <Searchbox placeholder="Search for all items here..." />
        <div className="relative md:flex gap-4 right-1 flex justify-start px-2 md:justify-end items-center">
          <Link to="/user/dashboard">
            <UserIcon className="w-6  duration-300 transform hover:scale-125 transition ease-linear" />
          </Link>
          <Link to="/cart">
            <div className="relative">
              <ShoppingCartIcon className="w-6 duration-300 transform hover:scale-125 transition ease-linear" />
              <span className="bg-secondary text-white text-[10px] rounded absolute top-[-3px] right-0 px-[4px] py-0">
                2
              </span>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}

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

  return (
    <Navbar className="max-w-full w-full px-4 md:px-[50px] lg:px-[100px] py-3 rounded-none shadow-none bg-primary z-5">
      <div className="flex items-center w-full justify-between text-blue-gray-900">
        <Link to="/" className="w-[40%] md:w-[10%]">
          <img src={logo} alt="logo" className="mr-[40px]" />
        </Link>

        <div className="hidden md:flex w-[90%]">
          <NavList />
        </div>
        <IconButton
          variant="text"
          className="ml-auto md:hidden block h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <XMarkIcon className="h-6 w-6" strokeWidth={2} />
          ) : (
            <Bars3Icon className="h-6 w-6" strokeWidth={2} />
          )}
        </IconButton>
      </div>
      <Collapse open={openNav}>
        <NavList />
      </Collapse>
    </Navbar>
  );
}
