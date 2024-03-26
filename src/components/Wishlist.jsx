import React from "react";
import {
  Drawer,
  Button,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";

export default function Wishlist() {
  const [open, setOpen] = React.useState(false);

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
        className="p-4"
      >
        <div className="mb-6 flex items-center justify-between">
          <Typography variant="h5" color="blue-gray">
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
        <div className="">

          do the design here
        </div>
      </Drawer>
    </React.Fragment>
  );
}
