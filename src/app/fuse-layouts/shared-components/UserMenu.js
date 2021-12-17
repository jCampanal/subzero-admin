import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import Icon from "@material-ui/core/Icon";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MenuItem from "@material-ui/core/MenuItem";
import Popover from "@material-ui/core/Popover";
import React, { useState } from "react";
import { Link } from "react-router-dom";

function UserMenu() {
  const [userMenu, setUserMenu] = useState(null);

  const userMenuClick = (event) => {
    setUserMenu(event.currentTarget);
  };

  const userMenuClose = () => {
    setUserMenu(null);
  };

  return (
    <>
      <Button
        className="min-h-40 min-w-40 px-0 md:px-16 py-0 md:py-6"
        onClick={userMenuClick}
      >
        <div className="hidden md:flex flex-col mx-4 items-end">
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
          <MenuItem component={Link} to="/login" role="button">
            <ListItemIcon className="min-w-40">
              <Icon>lock</Icon>
            </ListItemIcon>
            <ListItemText primary="Log out" />
          </MenuItem>
        </>
      </Popover>
    </>
  );
}

export default UserMenu;
