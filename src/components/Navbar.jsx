import React from "react";
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

  return (
    <>
      <div className="bg-white shadow-md sticky top-0 z-40 w-full py-3 ">
        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center justify-between px-4 py-3 w-[90%] mx-auto">
            <div className="flex items-center gap-6">
              {/* <Bars3Icon
                onClick={openDrawer}
                className="h-6 w-6 cursor-pointer lg:hidden "
                strokeWidth={2}
              /> */}

              <Link to="/" className="w-[50%] md:w-[70%] object-cover">
                <img src={logo} alt="logo" className="mr-[40px]" />
              </Link>
            </div>
            <div className="hidden md:flex w-full justify-center items-center gap-4">
              <Searchbox placeholder="Search for all items here..." />
            </div>
            <div className="relative md:flex gap-4 right-1 flex justify-start px-2 md:justify-end items-center">
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
    </>
  );
}
