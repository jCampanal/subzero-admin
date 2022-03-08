import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { random } from "lodash-es";
import { getOrdersByWhareHose } from "../../api-conn/shipments_order";

export const fetchOrders = createAsyncThunk(
  "ordersAdmin/fetchOrder",//s al final
  async ({
    wharehose,
    date2,
    _compnay,
    date1,
    _noOrder,
    rowsPerPage,
    page,
  }) => {
   /* const response = await getOrdersByWhareHose(
      wharehose.id,
      date2,
      _compnay,
      date1,
      _noOrder,
      rowsPerPage,
      page
    );*/

    const response={
      data:{
        data: [
          {
            "id": "67b6e540-0985-49e2-8a7a-3af8278f6e2e"+random(),
            "no": 0,
            "deliveryTime": "2021-09-12T05:50:00.0000000",
            "status": "Waiting",
            "priority": 1,
            "pickUp": false,
            "address": {
              "id": "67b6e540-0985-49e2-8a7a-3af8278f6e2e",
              "street": "Wall Street",
              "city": "New York",
              "state": "New York",
              "zipCode": 10001
            },
            "driver": {
              "email": "test@admin.com",
              "enabled": true,
              "id": "67b6e540-0985-49e2-8a7a-3af8278f6e2e",
              "imageURL": "url",
              "lastName": "Pérez",
              "name": "Juan",
              "phoneNumber": "test@admin.com",
              "userName": "Pedro",
              "warehouse": {
                "id": "67b6e540-0985-49e2-8a7a-3af8278f6e2e",
                "name": "FLL Warehouse",
                "address": {
                  "id": "67b6e540-0985-49e2-8a7a-3af8278f6e2e",
                  "street": "Wall Street",
                  "city": "New York",
                  "state": "New York",
                  "zipCode": 10001
                }
              }
            },
            "customer": {
              "company": {
                "id": "67b6e540-0985-49e2-8a7a-3af8278f6e2e",
                "name": "Company 1",
                "address": {
                  "id": "67b6e540-0985-49e2-8a7a-3af8278f6e2e",
                  "street": "Wall Street",
                  "city": "New York",
                  "state": "New York",
                  "zipCode": 10001
                }
              },
              "email": "test@admin.com",
              "id": "67b6e540-0985-49e2-8a7a-3af8278f6e2e",
              "imageURL": "url",
              "lastName": "Pérez",
              "listID": "80000002-1636062834",
              "name": "Juan",
              "phoneNumber": "test@admin.com",
              "priorityCustomer": false,
              "userName": "Juan",
              "warehouse": {
                "id": "67b6e540-0985-49e2-8a7a-3af8278f6e2e",
                "name": "FLL Warehouse",
                "address": {
                  "id": "67b6e540-0985-49e2-8a7a-3af8278f6e2e",
                  "street": "Wall Street",
                  "city": "New York",
                  "state": "New York",
                  "zipCode": 10001
                }
              }
            },
            "products": [
              {
                "id": "67b6e540-0985-49e2-8a7a-3af8278f6e2e",
                "pendingQuanty": 200,
                "completed": true,
                "description": "Dry Ice 4 kg",
                "quanty": 1,
                "name": "Dry Ice",
                "productSaleUnitId": "67b6e540-0985-49e2-8a7a-3af8278f6e2e",
                "listID": "80000002-1636062834"
              }
            ],
            "listID": "80000002-1636062834",
            "poNo": "string",
            "warehouse": {
              "id": "67b6e540-0985-49e2-8a7a-3af8278f6e2e",
              "name": "FLL Warehouse",
              "address": {
                "id": "67b6e540-0985-49e2-8a7a-3af8278f6e2e",
                "street": "Wall Street",
                "city": "New York",
                "state": "New York",
                "zipCode": 10001
              }
            },
            "isBySchedule": true
          }
        ],
        "totalPages": 5,
        "currentPage": 1,
        "haveNext": true,
        "havePrevious": true,
        "totalItems": 15}
      }
    
    return { wharehouse: wharehose, data: response.data };
  }
);
const ordersAdminSlice = createSlice({
  name: "ordersAdmin",
  initialState: {
    status: "idle",
    adminOrders: [],
    total: 0,
    cancelForm: false,
  },
  reducers: {
    setOrdersAdmin: (state, action) => {
      state.adminOrders = action.payload;
    },
    cancelAddOrderAdmin: (state, action) => {
      state.cancelForm = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Add any fetched posts to the array

        const newOrder = {
          wharehouse: action.payload.wharehouse,
          data: action.payload.data,
        };
        console.log(action.payload.data.totalItems)

        const orderIndex = state.adminOrders.findIndex(
          (o) => o.wharehouse.id === newOrder.wharehouse.id
        );

        if (orderIndex >= 0) {
          state.adminOrders[orderIndex] = newOrder;
        } else {
          state.adminOrders = state.adminOrders.concat(newOrder);
          
         // state.total = state.total + action.payload.data.data.length;
        }
        state.total = 0
        state.adminOrders.map(wherahouse=>{
          state.total+=wherahouse.data.data.length
        })

        state.adminOrders = state.adminOrders.sort(
          (a, b) => b.data.data.length - a.data.data.length
        );
        // state.adminOrders = [];
      })
      .addCase(fetchOrders.rejected, (state, action) => {
      //  state.status = "failed";
      //  state.error = action.error.message;

      
        state.status = "succeeded";
        // Add any fetched posts to the array

        const newOrder = {
          wharehouse: action.payload.wharehouse,
          data: action.payload.data,
        };
        console.log(action.payload.data.totalItems)

        const orderIndex = state.adminOrders.findIndex(
          (o) => o.wharehouse.id === newOrder.wharehouse.id
        );

        if (orderIndex >= 0) {
          state.adminOrders[orderIndex] = newOrder;
        } else {
          state.adminOrders = state.adminOrders.concat(newOrder);
          
         // state.total = state.total + action.payload.data.data.length;
        }
        state.total = 0
        state.adminOrders.map(wherahouse=>{
          state.total+=wherahouse.data.data.length
        })

        state.adminOrders = state.adminOrders.sort(
          (a, b) => b.data.data.length - a.data.data.length
        );
        // state.adminOrders = [];
      
      });
  },
});

export const { setOrdersAdmin, cancelAddOrderAdmin } = ordersAdminSlice.actions;

export const selectAllOrders = (state) => state.ordersAdmin.adminOrders;
export const selectTotal = (state) => state.ordersAdmin.total;
export const selectCancelStatus = (state) => state.ordersAdmin.cancelForm;

export default ordersAdminSlice.reducer;
