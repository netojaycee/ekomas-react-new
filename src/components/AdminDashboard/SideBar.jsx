import React, { useContext, useState } from "react";
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
import AuthContext from "../Context/AuthContext";

export default function AdminSidebar({hidden = "hidden" }) {
  const [openCategory, setOpenCategory] = React.useState(false);
  const [openProducts, setOpenProducts] = React.useState(false);
  const { logout } = useContext(AuthContext);

  const handleOpenCategory = () => {
    setOpenCategory(!openCategory);
  };

  const handleOpenProducts = () => {
    setOpenProducts(!openProducts);
  };

  return (
    <Card className={`w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5 h-full md:block ${hidden}`}>
      <div className="mb-2 p-4">
        <Typography variant="h5" color="blue-gray">
          Sidebar
        </Typography>
      </div>
      <List className="md:flex-col md:items-start">
        <ListItem>
          <ListItemPrefix>
            <PresentationChartBarIcon className="h-5 w-5" />
          </ListItemPrefix>
          <Link to="/admin/dashboard">Dashboard</Link>
        </ListItem>
        <Accordion
          open={openCategory}
          icon={
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`mx-auto h-4 w-4 transition-transform ${
                openCategory ? "rotate-180" : ""
              }`}
            />
          }
          onClick={() => handleOpenCategory()}
        >
          <ListItem className="p-0" selected={openCategory}>
            <AccordionHeader className="border-b-0 p-3">
              <ListItemPrefix>
                <ShoppingBagIcon className="h-5 w-5" />
              </ListItemPrefix>
              <Typography color="blue-gray" className="mr-auto font-normal">
                Category
              </Typography>
            </AccordionHeader>
          </ListItem>
          <AccordionBody className="py-1">
            <List className="p-0">
              <ListItem>
                <ListItemPrefix>
                  <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                <Link to="/admin/all-category">All Category</Link>
              </ListItem>
              <ListItem>
                <ListItemPrefix>
                  <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                <Link to="/admin/add-category">Add Category</Link>
              </ListItem>
            </List>
          </AccordionBody>
        </Accordion>
        <Accordion
          open={openProducts}
          icon={
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`mx-auto h-4 w-4 transition-transform ${
                openProducts ? "rotate-180" : ""
              }`}
            />
          }
          onClick={() => handleOpenProducts()}
        >
          <ListItem className="p-0" selected={openProducts}>
            <AccordionHeader className="border-b-0 p-3">
              <ListItemPrefix>
                <ShoppingBagIcon className="h-5 w-5" />
              </ListItemPrefix>
              <Typography color="blue-gray" className="mr-auto font-normal">
                Products
              </Typography>
            </AccordionHeader>
          </ListItem>
          <AccordionBody className="py-1">
            <List className="p-0">
              <ListItem>
                <ListItemPrefix>
                  <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                <Link to="/admin/all-product">All Products</Link>
              </ListItem>
              <ListItem>
                <ListItemPrefix>
                  <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                <Link to="/admin/add-product">Add Product</Link>
              </ListItem>
            </List>
          </AccordionBody>
        </Accordion>
        <ListItem>
          <ListItemPrefix>
            <PresentationChartBarIcon className="h-5 w-5" />
          </ListItemPrefix>
          <Link to="/admin/orders">Orders</Link>
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <PowerIcon className="h-5 w-5" />
          </ListItemPrefix>
          <button onClick={logout}>Logout</button>
        </ListItem>
      </List>
    </Card>
  );
}
