import React, { useState } from "react";
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
import { useContext } from "react";
import { ProductContext } from "./Context/ProductContext";
import { CartContext } from "./Context/CartContext";
import Searchbox from "./seachbox";
import AuthContext from "./Context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import Wishlist from "./Wishlist";

function NavChild() {
  const { data } = useContext(ProductContext);
  const { itemAmount } = useContext(CartContext);
  const { auth } = useContext(AuthContext);
  const categories = data
    ? [...new Set(data.map((product) => product.category))]
    : [];

  const [search, setSearch] = React.useState("");
  const onChange = ({ target }) => setSearch(target.value);
  return (
    <>
      <div className="relative flex flex-col md:flex-row w-full items-left md:items-center gap-4 justify-between px-4">
        <div className="flex items-center">
          <ul className="my-2 flex flex-col md:gap-2 lg:mb-0 lg:mt-0 md:flex-row lg:items-center lg:gap-[30px] mx-3 ">
            <Typography
              as="li"
              variant="medium"
              className="p-1 font-medium  duration-300 transform hover:scale-25 transition ease-linear"
            >
              <Link
                to="/products"
                className="flex items-center hover:text-secondary transition-colors"
              >
                Products
              </Link>
            </Typography>
            <Typography
              as="li"
              variant="medium"
              className="p-1 font-medium  duration-300 transform hover:scale-25 transition ease-linear"
            >
              <Link
                to="/products"
                className="flex items-center hover:text-secondary transition-colors"
              >
                Category
              </Link>
            </Typography>
          </ul>
        </div>
        <Searchbox placeholder="Search for all items here..." />
        <div className="relative md:flex gap-4 right-1 flex justify-start px-2 md:justify-end items-center">
          <Wishlist />
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
    <>
      <div className="bg-white shadow-lg fixed top-0 left-0 right-0 z-40 w-full py-3  mb-[150px]">
        <div className="flex items-center justify-evenly px-4 py-3 md:px-[50px] lg:px-[100px]">
          <div className="flex items-center">
            <Link to="/" className="w-[50%] md:w-[70%] object-cover">
              <img src={logo} alt="logo" className="mr-[40px]" />
            </Link>
          </div>{" "}
          <div className="hidden md:flex w-[90%]">
            <NavChild />{" "}
          </div>{" "}
          <IconButton
            variant="text"
            className="ml-auto md:hidden lg:hidden block h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent"
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
          <NavChild />
        </Collapse>
      </div>
    </>
  );
}
