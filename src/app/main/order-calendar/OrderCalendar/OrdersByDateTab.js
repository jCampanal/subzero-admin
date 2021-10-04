import React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import {useTranslation} from 'react-i18next';
import FuseScrollbars from '@fuse/core/FuseScrollbars';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';

const Days = {
    0: 'SUNDAY',
    1: 'MONDAY',
    2: 'TUESDAY',
    3: 'WEDNESDAY',
    4: 'THURSDAY',
    5: 'FRIDAY',
    6: 'SATURDAY',
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
    const {t} = useTranslation('orders-calendar');
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
                            label={<div>{`${t(Days[tabHeader.getDay()])} ${tabHeader.getDate()}/${tabHeader.getMonth() + 1}`}</div>}
                            {...a11yProps(index)}
                        />
                    ))}
                </Tabs>
            </AppBar>
            <SwipeableViews axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'} index={value} onChangeIndex={handleChangeIndex}>
                {props.tabHeaders.map((header, index) => (
                    <TabPanel key={index} value={value} index={index} dir={theme.direction}>
                        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                            <FuseScrollbars className="flex-grow overflow-x-auto overflow-y-visible">
                                <Table className="min-w-xl" aria-labelledby="tableTitle">
                                    <TableHead>
                                        <TableRow className="h-48 sm:h-64 text-left">
                                            <TableCell padding="none" className="w-40 md:w-64 text-center">
                                                ID
                                            </TableCell>
                                            <TableCell padding="none" className="w-40 md:w-64 text-center">
                                                {t('COMPANY')}
                                            </TableCell>
                                            <TableCell padding="none" className="w-40 md:w-64 text-center">
                                                {t('ARRIVE_TIME')}
                                            </TableCell>
                                            <TableCell padding="none" className="w-40 md:w-64 text-center">
                                                {t('PRIORITIZE')}
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {props.tabItems
                                            .filter((item) => item.arriveTime.getDate() === header.getDate())
                                            .map((tabItem, i) => (
                                                <TableRow key={i} className="h-48 sm:h-64 text-left">
                                                    <TableCell padding="none" className="w-40 md:w-64 text-center">
                                                        {tabItem.id}
                                                    </TableCell>
                                                    <TableCell padding="none" className="w-40 md:w-64 text-center">
                                                        {tabItem.companyName.replace(/\b\w/g, (c) => c.toUpperCase())}
                                                    </TableCell>
                                                    <TableCell padding="none" className="w-40 md:w-64 text-center">
                                                        {tabItem.arriveTime.toLocaleTimeString()}
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                    </TableBody>
                                </Table>
                            </FuseScrollbars>
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
