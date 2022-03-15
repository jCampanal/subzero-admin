import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllDrivers, getDriver, } from "../../api-conn/drivers/index";
import { getAllWarehouses } from "../../api-conn/warehouses/index";

export const fetchAllDriversAndWharerhouses = createAsyncThunk(
    "driverMonitor/fetchAllDriversAndWharerhouses",
    async (

    ) => {
      const responseDriver = await getAllDrivers(  );
      const responseWharerhouses = await getAllWarehouses(  );     
      return { data:{dataDriver:responseDriver.data,dataWharerhouses:responseWharerhouses.data} };
    }
  );


  const DriversMonitorSlice = createSlice({
    name: "driverMonitor",
    initialState: {
      statusDriver: "idle",
      DriversByWharerhouse: [],
      DriversCarded: false, 
      statusWharerhouses:'idle',      
      elements:[]     
    },
    
    reducers: {
        setDriversAndWharerhouses: (state, action) => {
          console.log("action.payload")
          console.log(action.payload)
          state.DriversByWharerhouse = action.payload;
        },
        setDriversCarded: (state, action) => {
          state.DriversCarded = action.payload;
        }        
      }, 
    extraReducers(builder) {
        builder
          .addCase(fetchAllDriversAndWharerhouses.pending, (state) => {
            state.statusDriver = "loading";
          })
          .addCase(fetchAllDriversAndWharerhouses.fulfilled, (state, action) => {
            state.statusDriver = "succeeded";
            //comentariar
            const DriversTrueInformation=action.payload.data.dataDriver.map(element=>{
              return({name:element.name+' '+element.lastName,
                      online:element.enabled,
                      warehouse:element.warehouse,
                      id:element.id,
                      enable:false,
                      lat: 26.761681,
                      lng: -81.191788,
                      color:'red'
                      })
          })
            state.DriversByWharerhouse=action.payload.data.dataWharerhouses.map((element,index)=>{
                return({...element,
                        enable:true,
                        Drivers:DriversTrueInformation.filter((Pelement)=>{
                          return(Pelement.warehouse.id===element.id)})})
              })
              
            })
            .addCase(fetchAllDriversAndWharerhouses.rejected, (state, action) => {
                state.statusDriver = "failed";
                state.error = action.error.message;
              })
            }
  })

  export const {setDriversAndWharerhouses,setDriversCarded } = DriversMonitorSlice.actions;

  export const selectDriversByWharerhouse = (state) => state.driverMonitor.DriversByWharerhouse;
  export const getDriversCarded = (state) => state.driverMonitor.DriversCarded;
  
  export default DriversMonitorSlice.reducer;
  