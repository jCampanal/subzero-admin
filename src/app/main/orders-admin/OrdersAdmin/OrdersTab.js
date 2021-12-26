import React, { lazy } from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";

const OrdersAdminTable = lazy(() => import("./OrdersTable"));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      className=""
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: "100%",
  },
}));

export default function OrdersTab(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          {props.tabItems.map((tabItem) => (
            <Tab
              key={tabItem.id}
              label={
                <div>
                  {tabItem.name}
                  <span className="ml-4 rounded-full text-white bg-blue-600 py-1 px-5">
                    {tabItem.orders.length}
                  </span>
                </div>
              }
              {...a11yProps(tabItem.id - 1)}
            />
          ))}
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        {props.tabItems.map((tabItem) => (
          <TabPanel
            key={tabItem.id}
            value={value}
            index={tabItem.id - 1}
            dir={theme.direction}
          >
            <OrdersAdminTable data={tabItem.orders} rows={props.rows} />
          </TabPanel>
        ))}
      </SwipeableViews>
    </div>
  );
}

OrdersTab.propTypes = {
  tabItems: PropTypes.array.isRequired,
  rows: PropTypes.array.isRequired,
};
