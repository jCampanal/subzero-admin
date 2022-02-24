import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import Icon from "@material-ui/core/Icon";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MenuItem from "@material-ui/core/MenuItem";
import Popover from "@material-ui/core/Popover";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "app/store/user/userSlice";
import { Lock, Person } from "@material-ui/icons";
import {useHistory} from 'react-router'

function UserMenu() {
  const [userMenu, setUserMenu] = useState(null);
  const history = useHistory();
  const dispatch = useDispatch();

  const userMenuClick = (event) => {
    setUserMenu(event.currentTarget);
  };

  const userMenuClose = () => {
    setUserMenu(null);
  };

  const handleLogOut = () => {
    dispatch(logoutUser());
  };
  const handleProfile = () => {
    history.push("/profile")
  };
  return (
    <>
      <Button
        className="min-h-40 min-w-40 px-0 md:px-16 py-0 md:py-6"
        onClick={userMenuClick}
      >
        <div className=" md:flex flex-col mx-4 items-end">
          <Avatar
            className="md:mx-4"
            alt="user photo"
            src={`${process.env.PUBLIC_URL}/assets/images/avatars/profile.jpg`}
          />
        </div>
      </Button>

      <Popover
        open={Boolean(userMenu)}
        anchorEl={userMenu}
        onClose={userMenuClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        classes={{
          paper: "py-8",
        }}
      >
        <>
          <MenuItem component={"span"} role="button" onClick={handleProfile}>
           
            <ListItemIcon className="min-w-40">
              <Person />
            </ListItemIcon>
            <ListItemText primary="Profile" />
          
          </MenuItem>
          <MenuItem component={"span"} role="button" onClick={handleLogOut}>
            <ListItemIcon className="min-w-40">
              <Lock />
            </ListItemIcon>
            <ListItemText primary="Log out" />
          </MenuItem>
        </>
      </Popover>
    </>
  );
}

export default UserMenu;
