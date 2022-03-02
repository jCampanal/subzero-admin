import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getOrdersByWhareHose } from "../../api-conn/shipments_order";

export const fetchOrders = createAsyncThunk(
  "ordersAdmin/fetchOrders",
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
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { setOrdersAdmin, cancelAddOrderAdmin } = ordersAdminSlice.actions;

export const selectAllOrders = (state) => state.ordersAdmin.adminOrders;
export const selectTotal = (state) => state.ordersAdmin.total;
export const selectCancelStatus = (state) => state.ordersAdmin.cancelForm;

export default ordersAdminSlice.reducer;
