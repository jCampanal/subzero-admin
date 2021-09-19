import { memo } from 'react';
import { IconButton, Button } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';

const dummyOrders = [
  {
    id: 1,
    customerName: 'Fre',
    customerCompany: 'Grop',
    shippingAddress: 'Lorem ipsum dolor amet',
    shippingTime: new Date(),
    ref: '',
    products: [
      { name: 'Lorem ipsum', quantity: 10, description: '', type: 'dry' },
      { name: 'Dolor amet', quantity: 25, description: '', type: 'pellet' },
      { name: 'Ipsum dolor', quantity: 12, description: '', type: 'blasting' },
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
      { name: 'Lorem ipsum', quantity: 10, description: '', type: 'dry' },
      { name: 'Dolor amet', quantity: 25, description: '', type: 'pellet' },
      { name: 'Ipsum dolor', quantity: 12, description: '', type: 'blasting' },
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
      { name: 'Lorem ipsum', quantity: 10, description: '', type: 'dry' },
      { name: 'Dolor amet', quantity: 25, description: '', type: 'pellet' },
      { name: 'Ipsum dolor', quantity: 12, description: '', type: 'blasting' },
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
      { name: 'Lorem ipsum', quantity: 10, description: '', type: 'dry' },
      { name: 'Dolor amet', quantity: 25, description: '', type: 'pellet' },
      { name: 'Ipsum dolor', quantity: 12, description: '', type: 'blasting' },
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
      { name: 'Lorem ipsum', quantity: 10, description: '', type: 'dry' },
      { name: 'Dolor amet', quantity: 25, description: '', type: 'pellet' },
      { name: 'Ipsum dolor', quantity: 12, description: '', type: 'blasting' },
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
      { name: 'Lorem ipsum', quantity: 10, description: '', type: 'dry' },
      { name: 'Dolor amet', quantity: 25, description: '', type: 'pellet' },
      { name: 'Ipsum dolor', quantity: 12, description: '', type: 'blasting' },
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
      { name: 'Lorem ipsum', quantity: 10, description: '', type: 'dry' },
      { name: 'Dolor amet', quantity: 25, description: '', type: 'pellet' },
      { name: 'Ipsum dolor', quantity: 12, description: '', type: 'blasting' },
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
      { name: 'Lorem ipsum', quantity: 10, description: '', type: 'dry' },
      { name: 'Dolor amet', quantity: 25, description: '', type: 'pellet' },
      { name: 'Ipsum dolor', quantity: 12, description: '', type: 'blasting' },
    ],
    process: false,
  },
];

function OrderMonitor() {
  return (
    <div className="mt-64">
      <div className="fixed bg-gray-900 text-gray-50 top-64 left-0 right-0 z-20 py-12 px-24 grid grid-cols-5 items-center justify-between align-center gap-7">
        <div className="text-center">
          <p className="text-lg font-bold">Totals</p>
          <div className="grid grid-cols-3 grid-rows-2 gap-1">
            <span className="uppercase font-semibold text-blue-400">Received</span>
            <span className="uppercase font-semibold text-blue-400">Process</span>
            <span className="uppercase font-semibold text-gray-50">Total</span>
            <span>{dummyOrders.filter((item) => !item.process).length}</span>
            <span>{dummyOrders.filter((item) => item.process).length}</span>
            <span>{dummyOrders.length}</span>
          </div>
        </div>
        <div className="text-center">
          <p className="text-lg font-bold">
            Total Dry Ice <span className="text-gray-100">(lbs)</span>
          </p>
          <div className="grid grid-cols-3 grid-rows-2 gap-1">
            <span className="uppercase font-semibold text-gray-50">Dray Ice</span>
            <span className="uppercase font-semibold text-gray-50">Pellets</span>
            <span className="uppercase font-semibold text-gray-50">Blasting</span>
            <span>0</span>
            <span>0</span>
            <span>0</span>
          </div>
        </div>
        <Button variant="contained" className="bg-blue-500 hover:bg-blue-700 text-white uppercase">
          Orders Completed
        </Button>
        <Button className="text-gray-500 hover:text-gray:200">{new Date().toLocaleString()}</Button>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            className="bg-gray-100"
            disableToolbar
            variant="inline"
            format="MM/dd/yyyy"
            margin="normal"
            label="Pick a date"
            onChange={() => null}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
        </MuiPickersUtilsProvider>
      </div>
      <div className="mt-14 flex flex-col">
        {dummyOrders.map((item) => (
          <div
            key={item.id}
            className="mb-28 last:mb-0 p-14 shadow-lg bg-white rounded-lg border border-gray-200"
          >
            <div className="flex flex-row justify-between gap-16 p-5 mb-10">
              <IconButton aria-label="Cancel the order" size="small">
                <Close />
              </IconButton>
              <span className="text-gray-800 text-lg font-semibold leading-8 flex-1 text-center">
                ID: {item.id}
              </span>
              <Button variant="contained" className="bg-blue-500 hover:bg-blue-700 text-white">
                Process
              </Button>
            </div>
            <div className="flex flex-col gap-10">
              <div className="grid grid-cols-12 grid-rows-1 gap-10 content-start">
                <table className="col-span-5 divide-y divide-green-200 text-lg font-sans bg-green-50 border border-green-100 rounded-sm">
                  <thead className="bg-green-100 font-medium text-gray-800 font-serif shadow">
                    <tr className="text-left tracking-wider border-t border-b">
                      <th scope="col" className="px-14 py-3">
                        Customer
                      </th>
                      <th scope="col" className="px-14 py-3">
                        Shipment
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="px-14 py-3">{item.customerCompany}</td>
                      <td className="px-14 py-3">{item.shippingAddress}</td>
                    </tr>
                    <tr>
                      <td className="px-14 py-3">{item.customerName}</td>
                      <td className="px-14 py-3">{item.shippingTime.toLocaleString()}</td>
                    </tr>
                  </tbody>
                </table>
                <table className="col-span-7 divide-y divide-green-200 text-lg font-sans bg-green-50 border border-green-100 rounded-sm">
                  <thead className="bg-green-100 font-medium text-gray-800 font-serif shadow">
                    <tr className="text-left tracking-wider border-t border-b">
                      <th scope="col" className="px-14 py-3">
                        Product
                      </th>
                      <th scope="col" className="px-14 py-3">
                        Quantity
                      </th>
                      <th scope="col" className="px-14 py-3">
                        Description
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {item.products.map((product) => (
                      <tr>
                        <td className="px-14 py-3">{product.name}</td>
                        <td className="px-14 py-3">{product.quantity}</td>
                        <td className="px-14 py-3">{product.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-base font-semibold uppercase">Ref:{item.ref}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default memo(OrderMonitor);
