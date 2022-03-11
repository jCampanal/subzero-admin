import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { random } from "lodash-es";
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
    firstDownloadflag:0,
    newOrdenCount:0,
    cancelForm: false,
  },
  reducers: {
    setOrdersAdmin: (state, action) => {
      state.adminOrders = action.payload;
    },
    setFlag: (state) => {
      state.firstDownloadflag = 1;
    },
    addedANewOrder: (state)=>{
      state.newOrdenCount=state.newOrdenCount+1
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
        console.log("Descarga de datos realizada")
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;

      
        
        
      
      });
  },
});

export const { setOrdersAdmin, cancelAddOrderAdmin,setFlag,addedANewOrder } = ordersAdminSlice.actions;

export const selectAllOrders = (state) => state.ordersAdmin.adminOrders;
export const selectTotal = (state) => state.ordersAdmin.total;
export const selectCancelStatus = (state) => state.ordersAdmin.cancelForm;
export const selectFlag=(state)=>state.ordersAdmin.firstDownloadflag;
export const selectNewOrderCount=(state)=>state.ordersAdmin.newOrdenCount

export default ordersAdminSlice.reducer;
