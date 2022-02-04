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
    console.log("wharehose", wharehose);
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
const userSlice = createSlice({
  name: "ordersAdmin",
  initialState: {
    status: "idle",
    adminOrders: [],
    total: 0,
  },
  reducers: {
    logUser: (state) => {
      state.logged = true;
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
        console.log("action", action);
        const newOrder = {
          wharehouse: action.payload.wharehouse,
          data: action.payload.data,
        };
        state.adminOrders = state.adminOrders.concat(newOrder);
        state.total = state.total + action.payload.data.data.length;
        // state.adminOrders = [];
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { logUser, logoutUser } = userSlice.actions;

export const selectAllOrders = (state) => state.ordersAdmin.adminOrders;
export const selectTotal = (state) => state.ordersAdmin.total;

export default userSlice.reducer;
