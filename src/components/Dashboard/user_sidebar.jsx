import React, { useContext } from "react";
import {
  Card,
  List,
  ListItem,
  ListItemPrefix,
} from "@material-tailwind/react";
import {
  ShoppingBagIcon,
  UserCircleIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import AuthContext from "../Context/AuthContext";

export function UserSidebar() {
  const [open, setOpen] = React.useState(0);
  const { logout } = useContext(AuthContext);

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  return (
    <Card className="h-full w-full max-w-full p-4 shadow-xl overflow-x-hidden shadow-blue-gray-900/5">
      <List>
        <Link to="/user/dashboard">
          <ListItem>
            <ListItemPrefix>
              <UserCircleIcon className="h-5 w-5" />
            </ListItemPrefix>
            My Account
          </ListItem>
        </Link>
        <hr className=" border-blue-gray-50" />
        <Link to="/user/orders">
          <ListItem>
            <ListItemPrefix>
              <ShoppingBagIcon className="h-5 w-5" />
            </ListItemPrefix>
            Orders
           
          </ListItem>
        </Link>
        
        <Link to="/user/saved-items">
          <ListItem>
            <ListItemPrefix>
              <UserCircleIcon className="h-5 w-5" />
            </ListItemPrefix>
            Saved Items
          </ListItem>
        </Link>

   

        <hr className=" border-blue-gray-50 " />

        {/* <ListItem>Account Management</ListItem>

      
        <hr className=" border-blue-gray-50" /> */}

        <ListItem className="flex font-bold justify-center">
          <ListItemPrefix>
            <PowerIcon className="h-5 w-5" />
          </ListItemPrefix>
          <button onClick={logout}>LOGOUT</button>
        </ListItem>
      </List>
    </Card>
  );
}
