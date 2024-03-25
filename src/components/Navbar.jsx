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

function NavList() {
  const { data } = useContext(ProductContext);
  const { itemAmount } = useContext(CartContext);
  const { auth } = useContext(AuthContext);
  const categories = data
    ? [...new Set(data.map((product) => product.category))]
    : [];
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleDropdownToggle = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleMouseEnter = () => {
    setIsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    setIsDropdownOpen(false);
  };
  const [search, setSearch] = React.useState("");
  const onChange = ({ target }) => setSearch(target.value);
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
              to="/products"
              className="flex items-center hover:text-secondary transition-colors"
            >
              Products
            </Link>
          </Typography>
          <Typography
            as="li"
            variant="medium"
            className="p-1 font-medium z-10 duration-300 transform hover:scale-25 transition ease-linear "
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <span
              className="flex items-center relative cursor-pointer"
              onClick={handleDropdownToggle}
            >
              Categories <ChevronDownIcon className="w-4" />
            </span>
            {/* Dropdown Content */}
            {isDropdownOpen && (
              <div className="absolute border w-full h-[100px] z-50 border-gray-200 shadow-lg py-2 px-4 bg-primary">
                {/* Example dropdown items */}
                {categories.map((category) => (
                  <Link
                    key={category} // Make sure to set a unique key for each element in the array
                    to={`/products?category=${category}`} // Use the category in the link URL
                    className="gap-8 hover:text-secondary flex flex-col duration-300 absolute transform ease-linear"
                  >
                    <div className="flex flex-col h-fit gap-10">
                      <ul>
                        <li>{category}</li>
                        <li>{category}</li>
                      </ul>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </Typography>
          {/* <Typography
            as="li"
            variant="medium"
            className="p-1 font-medium hover:text-secondary  duration-300 transform hover:scale-100 transition ease-linear"
          >
            <a
              href="#"
              className="flex items-center hover:text-secondary transition-colors"
            >
              Promotions
            </a>
          </Typography>
          <Typography
            as="li"
            variant="medium"
            className="p-1 font-medium hover:text-secondary  duration-300 transform hover:scale-100 transition ease-linear"
          >
            <a
              href="#"
              className="flex items-center hover:text-secondary transition-colors"
            >
              Explore
            </a>
          </Typography> */}
        </ul>
        {/* <div className="relative flex w-full lg:flex-row items-center mx-5">
          <div className=" md:w-full">
            {" "}
            <MagnifyingGlassIcon
              opacity={search ? 0 : 1}
              className="hidden lg:!absolute left-2 top-1/2 transform -translate-y-1/2 text-blue-gray-400 w-4"
            />
            <Input
              type="search"
              label="Search for products"
              value={search}
              onChange={onChange}
              className="rounded-md hover:rounded-none w-full outline-none border-none bg-white focus:border-white focus:rounded-none"
              containerProps={{
                className: "min-w-0",
              }}
            />
          </div>
          <Button
            size="md"
            color={search ? "gray" : "blue-gray"}
            disabled={!search}
            className=" rounded-none m-1 text-white rounded-md bg-secondary duration-300 transform hover:scale-125 transition ease-linear"
          >
            Search
          </Button>
        </div> */}
        <Searchbox placeholder="Search for all items here..." />
        <div className="relative md:flex gap-4 right-1 flex justify-start px-2 md:justify-end items-center">
          {/* <InformationCircleIcon className="w-6  duration-300 transform hover:scale-125 transition ease-linear" /> */}
          <Link to={auth?.user ? "/user/dashboard" : "/login"}>
            <UserIcon className="w-6  duration-300 transform hover:scale-125 transition ease-linear" />
          </Link>
          <Link to="/cart">
            <div className="relative">
              <ShoppingCartIcon className="w-6 duration-300 transform hover:scale-125 transition ease-linear" />
              <span className="bg-secondary text-white text-[10px] rounded absolute top-[-3px] right-0 px-[4px] py-0">
                {itemAmount}
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
        <NavList />
      </Collapse>
    </Navbar>
  );
}
