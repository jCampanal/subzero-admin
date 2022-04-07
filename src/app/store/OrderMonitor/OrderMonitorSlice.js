import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { random } from "lodash-es";
import { getOrdersByWhareHose } from "../../api-conn/shipments_order";


const dummyOrders = [
    {
        id: 1,
        state: 'Completed',
        Shipped: false,
        Deliver:'Driver1',
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
        state: 'Shipping',
        Shipped: false,
        Deliver:'',
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
        state: 'Process',
        Shipped: false,
        Deliver:'',
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
        state: 'Shipping',
        Shipped: false,
        Deliver:'',
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
        state: 'Completed',
        Shipped: false,
        Deliver:'Driver2',
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
        state: 'Shipping',
        Shipped: false,
        Deliver:'',
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
        state: 'Shipping',
        Shipped: false,
        Deliver:'',
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
        state: 'Shipping',
        Shipped: false,
        Deliver:'',
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


export const fetchOrders = createAsyncThunk(
  "ordersMonitor/fetchOrders",
  async ({
    wharehose,
    date2,
    _compnay,
    date1,
    _noOrder,
    rowsPerPage,
    page,
  }) => {
    const response = await getOrdersByWhareHose(
      wharehose.id,
      date2,
      _compnay,
      date1,
      _noOrder,
      rowsPerPage,
      page
    );


    
    return { wharehouse: wharehose, data: response.data };
  }
);





const ordersMonitorSlice = createSlice({
  name: "ordersMonitor",
  initialState: {
    status: "idle",    
    Orders: dummyOrders,    
  },
  reducers: {
    setOrdersinMonitor: (state, action) => {
      state.Orders = action.payload;
    },
    
  },
 
});

export const { setOrdersinMonitor} = ordersMonitorSlice.actions;

export const selectOrders = (state) => state.ordersMonitor.Orders;

export default ordersMonitorSlice.reducer;