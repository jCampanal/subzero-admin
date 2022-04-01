import React, {memo} from 'react';
import {Button, TableCell} from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import {MuiPickersUtilsProvider, KeyboardDatePicker} from '@material-ui/pickers';
import {useTranslation} from 'react-i18next';
import IconButton from '@material-ui/core/IconButton';
import {Close} from '@material-ui/icons';
import FuseScrollbars from '@fuse/core/FuseScrollbars';
import Table from '@material-ui/core/Table';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';

const dummyOrders = [
    {
        id: 1,
        customerName: 'Fre',
        customerCompany: 'Grop',
        shippingAddress: 'Lorem ipsum dolor amet',
        shippingTime: new Date(),
        ref: '',
        products: [
            {name: 'Lorem ipsum', quantity: 10, description: '', type: 'dry'},
            {name: 'Dolor amet', quantity: 25, description: '', type: 'pellet'},
            {name: 'Ipsum dolor', quantity: 12, description: '', type: 'blasting'},
        ],
        process: false,
    },
    {
        id: 2,
        customerName: 'Fre',
        customerCompany: 'Grop',
        shippingAddress: 'Lorem ipsum dolor amet',
        shippingTime: new Date(),
        ref: '',
        products: [
            {name: 'Lorem ipsum', quantity: 10, description: '', type: 'dry'},
            {name: 'Dolor amet', quantity: 25, description: '', type: 'pellet'},
            {name: 'Ipsum dolor', quantity: 12, description: '', type: 'blasting'},
        ],
        process: true,
    },
    {
        id: 3,
        customerName: 'Fre',
        customerCompany: 'Grop',
        shippingAddress: 'Lorem ipsum dolor amet',
        shippingTime: new Date(),
        ref: '',
        products: [
            {name: 'Lorem ipsum', quantity: 10, description: '', type: 'dry'},
            {name: 'Dolor amet', quantity: 25, description: '', type: 'pellet'},
            {name: 'Ipsum dolor', quantity: 12, description: '', type: 'blasting'},
        ],
        process: false,
    },
    {
        id: 4,
        customerName: 'Fre',
        customerCompany: 'Grop',
        shippingAddress: 'Lorem ipsum dolor amet',
        shippingTime: new Date(),
        ref: '',
        products: [
            {name: 'Lorem ipsum', quantity: 10, description: '', type: 'dry'},
            {name: 'Dolor amet', quantity: 25, description: '', type: 'pellet'},
            {name: 'Ipsum dolor', quantity: 12, description: '', type: 'blasting'},
        ],
        process: true,
    },
    {
        id: 5,
        customerName: 'Fre',
        customerCompany: 'Grop',
        shippingAddress: 'Lorem ipsum dolor amet',
        shippingTime: new Date(),
        ref: '',
        products: [
            {name: 'Lorem ipsum', quantity: 10, description: '', type: 'dry'},
            {name: 'Dolor amet', quantity: 25, description: '', type: 'pellet'},
            {name: 'Ipsum dolor', quantity: 12, description: '', type: 'blasting'},
        ],
        process: true,
    },
    {
        id: 6,
        customerName: 'Fre',
        customerCompany: 'Grop',
        shippingAddress: 'Lorem ipsum dolor amet',
        shippingTime: new Date(),
        ref: '',
        products: [
            {name: 'Lorem ipsum', quantity: 10, description: '', type: 'dry'},
            {name: 'Dolor amet', quantity: 25, description: '', type: 'pellet'},
            {name: 'Ipsum dolor', quantity: 12, description: '', type: 'blasting'},
        ],
        process: false,
    },
    {
        id: 7,
        customerName: 'Fre',
        customerCompany: 'Grop',
        shippingAddress: 'Lorem ipsum dolor amet',
        shippingTime: new Date(),
        ref: '',
        products: [
            {name: 'Lorem ipsum', quantity: 10, description: '', type: 'dry'},
            {name: 'Dolor amet', quantity: 25, description: '', type: 'pellet'},
            {name: 'Ipsum dolor', quantity: 12, description: '', type: 'blasting'},
        ],
        process: false,
    },
    {
        id: 8,
        customerName: 'Fre',
        customerCompany: 'Grop',
        shippingAddress: 'Lorem ipsum dolor amet',
        shippingTime: new Date(),
        ref: '',
        products: [
            {name: 'Lorem ipsum', quantity: 10, description: '', type: 'dry'},
            {name: 'Dolor amet', quantity: 25, description: '', type: 'pellet'},
            {name: 'Ipsum dolor', quantity: 12, description: '', type: 'blasting'},
        ],
        process: false,
    },
];

function OrdersMonitor() {
    const {t} = useTranslation('orders-monitor');
    return (
        <div>
            <div className="bg-black text-gray-50 z-30 py-12 px-24 grid grid-cols-1 md:grid-cols-5 items-center justify-between align-center fixed md:gap-7">
                <div className="text-center mb-9 md:mb-0">
                    <p className="text-lg font-bold">{t('TOTALS')}</p>
                    <div className="grid grid-cols-3 grid-rows-2 gap-1">
                        <span className="uppercase font-semibold text-blue-400">{t('RECEIVED')}</span>
                        <span className="uppercase font-semibold text-blue-400">{t('PROCESS')}</span>
                        <span className="uppercase font-semibold text-green-700">{t('TOTAL')}</span>
                        <span>{dummyOrders.filter((item) => !item.process).length}</span>
                        <span>{dummyOrders.filter((item) => item.process).length}</span>
                        <span>{dummyOrders.length}</span>
                    </div>
                </div>
                <div className="text-center mb-9 md:mb-0">
                    <p className="text-lg font-bold">
                        {t('TOTAL_DRY_ICE')} <span className="text-gray-100">(lbs)</span>
                    </p>
                    <div className="grid grid-cols-3 grid-rows-2 gap-1">
                        <span className="uppercase font-semibold text-gray-50">{t('DRY_ICE')}</span>
                        <span className="uppercase font-semibold text-gray-50">{t('PELLETS')}</span>
                        <span className="uppercase font-semibold text-gray-50">{t('BLASTING')}</span>
                        <span>0</span>
                        <span>0</span>
                        <span>0</span>
                    </div>
                </div>
                <Button variant="contained" className="bg-blue-500 hover:bg-blue-700 text-white uppercase mb-9 md:mb-0">
                    {t('ORDERS_COMPLETED')}
                </Button>
                <Button className="text-gray-500 hover:text-gray:200 mb-9 md:mb-0">{new Date().toLocaleString(t('CURRENT_LANGUAGE'))}</Button>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                        className="bg-gray-100"
                        disableToolbar
                        variant="inline"
                        format="MM/dd/yyyy"
                        margin="normal"
                        onChange={() => null}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />
                </MuiPickersUtilsProvider>
            </div>
            <div className="mt-96 flex flex-col px-10 md:px-14">
                {dummyOrders.map((item) => (
                    <div key={item.id} className="mb-28 last:mb-0 p-14 shadow-lg bg-white rounded-lg border border-gray-200">
                        <div className="flex flex-row justify-between gap-16 p-5 mb-10">
                            <IconButton aria-label="Cancel the order" size="small">
                                <Close />
                            </IconButton>
                            <span className="text-gray-800 text-lg font-semibold leading-8 flex-1 text-center">ID: {item.id}</span>

                        </div>
                        <div className="flex flex-col gap-10">
                            <div className="grid grid-cols-1 sm:grid-cols-12 gap-7 sm:gap-20 content-start">
                                <FuseScrollbars className="flex-grow overflow-x-auto sm:col-span-4">
                                    <Table aria-labelledby="tableTitle">
                                        <TableHead>
                                            <TableRow className="h-40">
                                                <TableCell className="px-4 md:px-0" component="th" scope="row" padding="none">
                                                    {t('CUSTOMER')}
                                                </TableCell>
                                                <TableCell className="px-4 md:px-0" component="th" scope="row" padding="none">
                                                    {t('SHIPMENT')}
                                                </TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            <TableRow hover className="h-32">
                                                <TableCell className="px-4 md:px-0" component="th" scope="row" padding="none">
                                                    {item.customerCompany}
                                                </TableCell>
                                                <TableCell className="px-4 md:px-0" component="th" scope="row" padding="none">
                                                    {item.shippingAddress}
                                                </TableCell>
                                            </TableRow>
                                            <TableRow hover className="h-32">
                                                <TableCell className="px-4 md:px-0" component="th" scope="row" padding="none">
                                                    {item.customerName}
                                                </TableCell>
                                                <TableCell className="px-4 md:px-0" component="th" scope="row" padding="none">
                                                    {item.shippingTime.toLocaleString(t('CURRENT_LANGUAGE'))}
                                                </TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </FuseScrollbars>
                                <FuseScrollbars className="flex-grow overflow-x-auto sm:col-span-8">
                                    <Table aria-labelledby="tableTitle">
                                        <TableHead>
                                            <TableRow className="h-40">
                                                <TableCell className="px-4 md:px-0" component="th" scope="row" padding="none">
                                                    {t('PRODUCT')}
                                                </TableCell>
                                                <TableCell className="px-4 md:px-0" component="th" scope="row" padding="none">
                                                    {t('QUANTITY')}
                                                </TableCell>
                                                <TableCell className="px-4 md:px-0" component="th" scope="row" padding="none">
                                                    {t('DESCRIPTION')}
                                                </TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {item.products.map((product) => (
                                                <TableRow hover className="h-32">
                                                    <TableCell className="px-4 md:px-0" component="th" scope="row" padding="none">
                                                        {product.name}
                                                    </TableCell>
                                                    <TableCell className="px-4 md:px-0" component="th" scope="row" padding="none">
                                                        {product.quantity}
                                                    </TableCell>
                                                    <TableCell className="px-4 md:px-0" component="th" scope="row" padding="none">
                                                        {product.description}
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>

                                </FuseScrollbars>
                            </div>
                                <div className="flex justify-between items-center">
                                
                                    <p className="text-base font-semibold uppercase">Ref:{item.ref}</p>
                                    <Button variant="contained" className="bg-blue-500 w-1/5 self-end hover:bg-blue-700 text-white">
                                                    {t('PROCESS')}
                                    </Button>
                               </div>
                                
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default memo(OrdersMonitor);
