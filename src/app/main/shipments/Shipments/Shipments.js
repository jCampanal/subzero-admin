import {memo} from 'react';
import {Accordion, AccordionDetails, AccordionSummary, Button} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import {ExpandMore} from '@material-ui/icons';

const dummyShipments = [
    {
        id: 1,
        name: 'Glue',
        shipments: [
            {id: 1, warehouse: 'Lorem', date: new Date()},
            {id: 2, warehouse: 'Lorem', date: new Date()},
            {id: 3, warehouse: 'Lorem', date: new Date()},
        ],
    },
    {
        id: 2,
        name: 'Glue',
        shipments: [{id: 1, warehouse: 'Lorem', date: new Date()}],
    },
    {
        id: 3,
        name: 'Glue',
        shipments: [
            {id: 1, warehouse: 'Lorem', date: new Date()},
            {id: 2, warehouse: 'Lorem', date: new Date()},
            {id: 3, warehouse: 'Lorem', date: new Date()},
            {id: 4, warehouse: 'Lorem', date: new Date()},
            {id: 5, warehouse: 'Lorem', date: new Date()},
        ],
    },
];

function Shipments() {
    return (
        <div>
            <p className="h1">
                <i className="fa fa-truck-loading text-4xl mr-14" />
                Shipments <span className="text-gray-50 rounded-full px-16 bg-blue-600">{dummyShipments.length}</span>
            </p>
            <div className="mt-14">
                {dummyShipments.map((item) => (
                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMore />} aria-controls="panel1a-content" id="panel1a-header">
                            <Typography className="h3">
                                {item.name} <span className="rounded-full px-9 py-3 bg-blue-600 text-gray-50 shadow-sm">{item.shipments.length}</span>
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <div className="mt-2 flex flex-col">
                                <div className="-my-2 overflow-x-auto -mx-4 sm:-mx-6 lg:-mx-8">
                                    <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                                        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                                            <table className="min-w-full divide-y divide-gray-100 text-lg font-sans">
                                                <tbody className="bg-white divide-y divide-gray-200">
                                                    {item.shipments.map((shipment) => (
                                                        <tr key={shipment.id} className="odd:bg-gray-200 hover:bg-gray-100">
                                                            <td className="px-14 py-3">{shipment.warehouse}</td>
                                                            <td className="px-14 py-3">{shipment.date.toLocaleString()}</td>
                                                            <td className="px-14 py-3">
                                                                <div className="flex justify-end items-center">
                                                                    <Button
                                                                        type="button"
                                                                        className="text-sm text-gray-700 hover:text-gray-800 leading-none rounded-md mr-5"
                                                                    >
                                                                        <i className="fa fa-reply-all mr-4" />
                                                                    </Button>
                                                                    <Button
                                                                        type="button"
                                                                        className="text-sm text-gray-700 hover:text-gray-800 leading-none rounded-md"
                                                                    >
                                                                        <i className="fa fa-business-time mr-4" />
                                                                    </Button>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </AccordionDetails>
                    </Accordion>
                ))}
            </div>
        </div>
    );
}

export default memo(Shipments);
