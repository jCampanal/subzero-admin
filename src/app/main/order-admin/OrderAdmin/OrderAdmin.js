import {memo} from 'react';
import {Button, TextField} from '@material-ui/core';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import {KeyboardDatePicker} from '@material-ui/pickers';
import WarehouseTab from './WarehouseTab';

const dummyOrders = [
    {
        id: 1,
        name: 'Nascetur',
        orders: [
            {id: 1, company: 'Ridiculus', arriveTime: new Date(), status: 1},
            {id: 2, company: 'MUS', arriveTime: new Date(), status: 2},
            {id: 3, company: 'Mauris', arriveTime: new Date(), status: 3},
            {id: 4, company: 'Vitae', arriveTime: new Date(), status: 1},
            {id: 5, company: 'Ultricies', arriveTime: new Date(), status: 1},
            {id: 6, company: 'LEO', arriveTime: new Date(), status: 2},
        ],
    },
    {
        id: 2,
        name: 'Integer',
        orders: [
            {id: 1, company: 'Ridiculus', arriveTime: new Date(), status: 1},
            {id: 2, company: 'MUS', arriveTime: new Date(), status: 2},
            {id: 3, company: 'Mauris', arriveTime: new Date(), status: 3},
            {id: 4, company: 'Vitae', arriveTime: new Date(), status: 1},
            {id: 5, company: 'Ultricies', arriveTime: new Date(), status: 1},
            {id: 6, company: 'LEO', arriveTime: new Date(), status: 3},
            {id: 7, company: 'Ultricies', arriveTime: new Date(), status: 1},
            {id: 8, company: 'LEO', arriveTime: new Date(), status: 2},
        ],
    },
    {
        id: 3,
        name: 'Malesuada',
        orders: [
            {id: 1, company: 'Ridiculus', arriveTime: new Date(), status: 1},
            {id: 2, company: 'MUS', arriveTime: new Date(), status: 2},
            {id: 3, company: 'Mauris', arriveTime: new Date(), status: 3},
            {id: 4, company: 'Vitae', arriveTime: new Date(), status: 1},
        ],
    },
];

function OrderAdmin() {
    return (
        <div>
            <p className="h1">
                <AssignmentTurnedInIcon className="text-5xl mr-14" />
                Order Admin <span className="text-gray-50 rounded-full px-16 bg-blue-600">{dummyOrders.length}</span>
            </p>
            <div className="flex flex-col gap-10 min-w-full my-14 border border-gray-300 shadow shadow-large rounded bg-white">
                <div className="flex flex-row justify-start gap-20 py-10 px-14 bg-gray-200">
                    <Button variant="contained" className="bg-blue-500 hover:bg-blue-700 text-white">
                        New order
                    </Button>
                    <Button className="text-blue-700 hover:text-blue-500">Drivers cleanup</Button>
                </div>
                <div className="grid grid-cols-4 gap-20 pb-10 px-20">
                    <TextField id="order-id" label="Order ID" fullWidth margin="dense" />
                    <TextField id="order-company" label="Company" fullWidth margin="dense" />
                    <KeyboardDatePicker
                        disableToolbar
                        variant="inline"
                        format="MM/dd/yyyy"
                        margin="dense"
                        fullWidth
                        label="From"
                        onChange={() => null}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />
                    <KeyboardDatePicker
                        disableToolbar
                        format="MM/dd/yyyy"
                        margin="dense"
                        fullWidth
                        label="To"
                        onChange={() => null}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />
                </div>
            </div>
            <div>
                <WarehouseTab tabItems={dummyOrders} />
            </div>
        </div>
    );
}

export default memo(OrderAdmin);
