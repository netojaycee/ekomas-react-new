import React, { useContext } from "react";
import {
  Drawer,
  Button,
  IconButton,
} from "@material-tailwind/react";

import { Bars3Icon } from "@heroicons/react/24/outline";
import logo from "../../assets/images/logo.png";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";
import { ChevronRightIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import AdminSidebar from "./SideBar";
import AuthContext from "../Context/AuthContext";

const handleLogout = () => {
  // logout();
};

export default function DrawerDefault() {
  const [open, setOpen] = React.useState(false);
  const [openCategory, setOpenCategory] = React.useState(false);
  const [openProducts, setOpenProducts] = React.useState(false);
  const { logout } = useContext(AuthContext);

  const handleOpenCategory = () => {
    setOpenCategory(!openCategory);
  };

  const handleOpenProducts = () => {
    setOpenProducts(!openProducts);
  };


  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);

  return (
    <React.Fragment>
      {/* <Button onClick={openDrawer}>Open Drawer</Button> */}
      <Bars3Icon role="button" onClick={openDrawer} className="h-6 w-6 " strokeWidth={2} />
      <Drawer open={open} onClose={closeDrawer} className="p-4">
        <div className="mb-6 flex items-center justify-between">
          <div className="md:hidden">
            <Link to="/">
              <img src={logo} alt="logo" className="mr-[40px]" />
            </Link>
          </div>
          <IconButton variant="text" color="blue-gray" onClick={closeDrawer}>
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
<AdminSidebar hidden={"block"} />        
      </Drawer>
    </React.Fragment>
  );
}