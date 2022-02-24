import React, { lazy } from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import { useSelector, useDispatch } from "react-redux";
import {
  selectAllOrders,
  setOrdersAdmin,
} from "app/store/oredersAdmin/ordersAdminSlice";

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
  const orders = useSelector(selectAllOrders);
  const dispatch = useDispatch();
  const handleChange = (event, newValue) => {
    console.log("newValue", newValue);
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    console.log("index", index);
    setValue(index);
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;
    if (result.destination.index === result.source.index) return;

    const newTabs = Array.from(orders);
    const [removed] = newTabs.splice(result.source.index, 1);
    newTabs.splice(result.destination.index, 0, removed);
    dispatch(setOrdersAdmin(newTabs));
  };

  return (
    <div className={classes.root}>
      <AppBar position='sticky' color="default" >
        {/* <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="tabs">
            {(props) => (
              <Tabs
                ref={props.innerRef}
                {...props.droppableProps}
                value={value}
                // onChange={handleTabChange} Not used
                onChange={handleChange}
                indicatorColor="primary"
                textColor="primary"
                variant="fullWidth"
                aria-label="full width tabs"
              >
                {orders.map((tabItem, index) => (
                  <Draggable
                    key={tabItem.wharehouse.id}
                    draggableId={`id-${tabItem.wharehouse.id}`} // must be a string
                    index={index}
                    disableInteractiveElementBlocking={true}
                  >
                    {(props) => (
                      <Tab
                        ref={props.innerRef}
                        {...props.draggableProps}
                        {...props.dragHandleProps}
                        onClick={() => setValue(index)} // Set active tab like this
                        key={tabItem.wharehouse.id}
                        // style={{
                        //   flexGrow: "1",
                        //   maxWidth: "none",
                        //   flexBasis: "0",
                        //   flexShrink: "1",
                        // }}
                        label={
                          <div>
                            {tabItem.wharehouse.name}
                            <span className="ml-4 rounded-full text-white bg-blue-600 py-1 px-5">
                              {tabItem.data.data.length}
                            </span>
                          </div>
                        }
                        {...a11yProps(tabItem.id - 1)}
                      />
                    )}
                  </Draggable>
                ))}
                {props.placeholder}
              </Tabs>
            )}
          </Droppable>
        </DragDropContext> */}
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          {orders.map((tabItem) => (
            <Tab 
              key={tabItem.wharehouse.id}
              label={
                <div>
                  {tabItem.wharehouse.name}
                  <span className="ml-4 rounded-full text-white bg-blue-600 py-1 px-5">
                    {tabItem.data.data.length}
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
        {orders.map((tabItem, i) => (
          <TabPanel
            key={tabItem.wharehouse.id}
            value={value}
            index={i}
            dir={theme.direction}
          >
            <OrdersAdminTable
              wharehose={tabItem.wharehouse}
              rows={props.rows}
              data={{
                data: tabItem.data.data,
                totalItems: tabItem.data.totalItems,
              }}
            />
          </TabPanel>
        ))}
      </SwipeableViews>
    </div>  
    
  );
}

OrdersTab.propTypes = {
  tabItems: PropTypes.array.isRequired,
  rows: PropTypes.array.isRequired,
  totalOrders: PropTypes.number.isRequired,
};
