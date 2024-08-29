import React, { useEffect } from "react";
import {
  Drawer,
  Button,
  Typography,
  IconButton,
  List,
  ListItem,
} from "@material-tailwind/react";
import { Menu } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { createUser } from "../services/User";
import localStorageFunctions from "../utils/localStorageFunctions.js";
import { useLocation } from "react-router-dom";

export default function DrawerComp() {
  const [open, setOpen] = React.useState(false);
  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);
  const { loginWithRedirect, user, isAuthenticated } = useAuth0();
  const location = useLocation();

  useEffect(() => {
    if (isAuthenticated) {
      const createOrupdateUser = async () => {
        try {
          let obj = {
            name: user.name,
            picture: user.picture,
            email: user.email,
          };
          let res = await createUser(obj);
          if (res.user) {
            localStorageFunctions.saveInLocalstorage("userId", res.user._id);
          }
        } catch (error) {
          console.error("Error calling API:", error);
        }
      };

      createOrupdateUser();
    }
  }, [isAuthenticated, user]);

  return (
    <React.Fragment>
      <Menu onClick={openDrawer} className="h-6 w-6 cursor-pointer" />
      <Drawer open={open} onClose={closeDrawer}>
        <div className="mb-2 flex items-center justify-between p-4">
          <Typography variant="h5" color="blue-gray">
            <Link to="/" onClick={closeDrawer}>
              DriveFood
            </Link>
          </Typography>
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
        <List>
          {!user?.picture && location.pathname !== "/restaurant/items-list" && (
            <ListItem>
              <Link
                className="font-bold block"
                onClick={() => loginWithRedirect()}
              >
                Login/Signup User
              </Link>
            </ListItem>
          )}
          <ListItem>
            <Link
              className="font-bold"
              to="/restaurant/login-or-signup"
              onClick={closeDrawer}
            >
              Add to your restaurant
            </Link>
          </ListItem>
        </List>
      </Drawer>
    </React.Fragment>
  );
}
