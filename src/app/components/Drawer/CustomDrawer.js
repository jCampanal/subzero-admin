import { Drawer } from "@material-ui/core";

import React from "react";

const CustomDrawer = ({ open, toggleDrawer, anchor, children }) => {
  return (
    <div>
      <React.Fragment key={anchor}>
        <Drawer anchor={anchor} open={open} onClose={toggleDrawer(false)}>
          {children}
        </Drawer>
      </React.Fragment>
    </div>
  );
};

export default CustomDrawer;
