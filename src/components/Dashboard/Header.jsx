import React, { useState } from "react";
import {
  Navbar,
  Collapse,
  Typography,
  IconButton,
  Input,
  Drawer,
  Button,
} from "@material-tailwind/react";
import {
  Bars3Icon,
  XMarkIcon,
  MagnifyingGlassIcon,
  InformationCircleIcon,
  UserIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import logo from "../../assets/images/logo.png";
import { Link } from "react-router-dom";
import DrawerDefault from "./Drawer";




export default function AdminNav() {
  const [openNav, setOpenNav] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const onChange = ({ target }) => setSearch(target.value);

  const handleWindowResize = () =>
    window.innerWidth >= 960 && setOpenNav(false);

  React.useEffect(() => {
    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  return (
    <Navbar className="max-w-full w-full py-3 rounded-none shadow-none bg-primary z-10">
      <div className="w-[100%] md:w-[95%] mx-auto items-center flex gap-4 justify-between">
        <div className="md:hidden">
          <DrawerDefault />          
        </div>
        <div className="md:block hidden">
          <Link to="/">
            <img src={logo} alt="logo" className="mr-[40px]" />
          </Link>
        </div>
        <div className="flex flex-row items-center">
          <MagnifyingGlassIcon
            opacity={search ? 0 : 1}
            className="hidden lg:!absolute left-2 top-1/2 transform -translate-y-1/2 text-blue-gray-400 w-4"
          />
          <Input
            type="search"
            label="Search for products"
            value={search}
            onChange={onChange}
            className="w-[100%] rounded-none hover:rounded-none bg-white focus:border-white focus:rounded-none"
            containerProps={{
              className: "min-w-0",
            }}
          />
          <Button
            size="md"
            color={search ? "gray" : "blue-gray"}
            disabled={!search}
            className=" rounded-none m-1 text-white bg-secondary duration-300 transform hover:scale-125 transition ease-linear"
          >
            Search
          </Button>
        </div>
        <div className="items-center hidden gap-7 md:flex">
          <InformationCircleIcon className="w-6  duration-300 transform hover:scale-125 transition ease-linear" />
          <UserIcon className="w-6  duration-300 transform hover:scale-125 transition ease-linear" />
        </div>
      </div>
    </Navbar>
  );
}
