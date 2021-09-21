import React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';

const Days = {
    0: 'Sunday',
    1: 'Monday',
    2: 'Tuesday',
    3: 'Wednesday',
    4: 'Thursday',
    5: 'Friday',
    6: 'Saturday',
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

export default function OrdersByDateTab(props) {
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
                    variant="scrollable"
                    scrollButtons="auto"
                    aria-label="full width tabs example"
                >
                    {props.tabHeaders.map((tabHeader, index) => (
                        <Tab
                            key={index}
                            label={<div>{`${Days[tabHeader.getDay()]} ${tabHeader.getDate()}/${tabHeader.getMonth() + 1}`}</div>}
                            {...a11yProps(index)}
                        />
                    ))}
                </Tabs>
            </AppBar>
            <SwipeableViews axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'} index={value} onChangeIndex={handleChangeIndex}>
                {props.tabHeaders.map((header, index) => (
                    <TabPanel key={index} value={value} index={index} dir={theme.direction}>
                        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-100 text-lg font-sans">
                                <thead className="bg-gray-50 font-medium text-gray-800 font-serif">
                                    <tr className="text-left tracking-wider border-t border-b">
                                        <th scope="col" className="px-14 py-3">
                                            ID
                                        </th>
                                        <th scope="col" className="px-14 py-3">
                                            Company
                                        </th>
                                        <th scope="col" className="px-14 py-3">
                                            Arrive Time
                                        </th>
                                        <th scope="col" className="px-14 py-3">
                                            Prioritize
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {props.tabItems
                                        .filter((item) => item.arriveTime.getDate() === header.getDate())
                                        .map((tabItem, i) => (
                                            <tr key={i} className="odd:bg-gray-200 hover:bg-gray-100">
                                                <td className="px-14 py-3">{tabItem.id}</td>
                                                <td className="px-14 py-3">{tabItem.companyName.replace(/\b\w/g, (c) => c.toUpperCase())}</td>
                                                <td className="px-14 py-3">{tabItem.arriveTime.toLocaleTimeString()}</td>
                                                <td className="px-14 py-3" />
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

OrdersByDateTab.propTypes = {
    tabHeaders: PropTypes.array.isRequired,
    tabItems: PropTypes.array.isRequired,
};
