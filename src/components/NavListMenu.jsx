import React, { useState } from "react";
import {
  Typography,
  ListItem,
  Menu,
  MenuHandler,
  MenuList,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
} from "@material-tailwind/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
// import useAuth from "../hooks/UseAuth";
import { Link } from "react-router-dom";

export default function NavListMenu() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <React.Fragment>
      <Menu
        open={isMenuOpen}
        handler={setIsMenuOpen}
        offset={{ mainAxis: 20 }}
        placement="bottom"
        allowHover={true}
      >
        <MenuHandler>
          <Typography as="div" variant="small" className="font-medium">
            <Typography
              as="li"
              variant="medium"
              color="white"
              className="flex items-center gap-x-1 p-1 font-medium"
            >
              Categories
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`h-3 w-3 transition-transform ${
                  isMenuOpen ? "rotate-180" : ""
                }`}
              />
            </Typography>
          </Typography>
        </MenuHandler>
        <MenuList className="">
          <Card className="w-85">
            <CardBody className="">
            <div className="p-4 bg-white shadow-md rounded-lg">
      <Typography variant="h5" color="primary">Categories</Typography>
      <div className="flex flex-col gap-2 mt-2">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
          <Typography>Category 1</Typography>
        </div>
       
      </div>
    </div>
                
            </CardBody>
          </Card>
        </MenuList>
      </Menu>
    </React.Fragment>
  );
}
