import React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

export const ShipmentStatus = {
    1: {name: 'Shipping', icon: 'fa-truck', tColor: 'blue-700'},
    2: {name: 'Delivered', icon: 'fa-handshake', tColor: 'green-700'},
    3: {name: 'Canceled', icon: 'fa-times', tColor: 'red-700'},
};

function TabPanel(props) {
    const {children, value, index, ...other} = props;

    return (
        <div className="" role="tabpanel" hidden={value !== index} id={`full-width-tabpanel-${index}`} aria-labelledby={`full-width-tab-${index}`} {...other}>
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
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        width: '100%',
    },
}));

export default function WarehouseTab(props) {
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
                                    <span className="ml-4 rounded-full text-white bg-blue-600 py-1 px-5">{tabItem.orders.length}</span>
                                </div>
                            }
                            {...a11yProps(tabItem.id - 1)}
                        />
                    ))}
                </Tabs>
            </AppBar>
            <SwipeableViews axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'} index={value} onChangeIndex={handleChangeIndex}>
                {props.tabItems.map((tabItem) => (
                    <TabPanel key={tabItem.id} value={value} index={tabItem.id - 1} dir={theme.direction}>
                        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-100 text-lg font-sans">
                                <thead className="bg-gray-50 font-medium text-gray-800 font-serif">
                                    <tr className="text-left tracking-wider border-t border-b">
                                        <th scope="col" className="px-14 py-3">
                                            Id
                                        </th>
                                        <th scope="col" className="px-14 py-3">
                                            Company
                                        </th>
                                        <th scope="col" className="px-14 py-3">
                                            Arrive Time
                                        </th>
                                        <th scope="col" className="px-14 py-3">
                                            Status
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {tabItem.orders.map((order) => (
                                        <tr key={order.id} className="odd:bg-gray-200 hover:bg-gray-100">
                                            <td className="px-14 py-3">{order.id}</td>
                                            <td className="px-14 py-3">{order.company}</td>
                                            <td className="px-14 py-3">{order.arriveTime.toLocaleDateString()}</td>
                                            <td className="px-14 py-3">
                                                <span className={`text-${ShipmentStatus[order.status].tColor} text-sm`}>
                                                    <i className={`fa ${ShipmentStatus[order.status].icon} mr-4`} />
                                                    {ShipmentStatus[order.status].name}
                                                </span>
                                            </td>
                                            <td className="px-14 py-3">
                                                <div className="flex justify-end items-center">
                                                    <Button type="button" className="text-sm text-gray-700 hover:text-gray-800 leading-none rounded-md mr-5">
                                                        <i className="fa fa-edit mr-4" />
                                                        Edit
                                                    </Button>
                                                    <Button type="button" className="text-sm text-red-700 hover:text-red-800 leading-none rounded-md">
                                                        <i className="fa fa-trash mr-4" />
                                                        Delete
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </TabPanel>
                ))}
            </SwipeableViews>
        </div>
    );
}

WarehouseTab.propTypes = {
    tabItems: PropTypes.array.isRequired,
};
