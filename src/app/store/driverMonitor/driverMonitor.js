import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllDrivers, getDriver, } from "../../api-conn/drivers/index";

export const fetchDrivers = createAsyncThunk(
    "driverMonitor/fetchAllDrivers",
    async (

    ) => {
      const responseAll = await getAllDrivers(  );

    /* si hay que hacer msa de dos recogidas de datos*/
    /*  const Drivers=[]
      console.log(responseAll.data.length)
      for(let i=0;i<responseAll.data.length;i++){
        console.log('Entro en el ciclo')
        const Aux=await getDriver(responseAll.data[i].id)
        console.log('Hizo la peticion')
        Drivers.push({...Aux.data})
      }
      console.log("get by drivers")
      console.log(Drivers)
      return { data: Drivers };*/
      return { data:responseAll.data };
    }
  );

  const DriversMonitorSlice = createSlice({
    name: "driverMonitor",
    initialState: {
      status: "idle",
      Drivers: [],
      DriversCarded: false,      
    },
    
    reducers: {
        setDrivers: (state, action) => {
          state.Drivers = action.payload;
        },
        setDriversCarded: (state, action) => {
          state.DriversCarded = action.payload;
        },
      }, 
    extraReducers(builder) {
        builder
          .addCase(fetchDrivers.pending, (state) => {
            state.status = "loading";
          })
          .addCase(fetchDrivers.fulfilled, (state, action) => {
            state.status = "succeeded";
            // Add any fetched posts to the array  
            console.log('data')
            console.log(action.payload.data)
            const Drivers = [...action.payload.data]
            
              console.log('Drivers')
              console.log(Drivers)
            const DriversTrueInformation=Drivers.map(element=>{
                return({name:element.name,
                        LastName:element.lastName,
                        online:element.enabled,
                        id:element.id,
                        enable:false,
                        lat: 26.761681,
                        lng: -81.191788,
                        color:'red'
                        })
            })
      
              state.Drivers=[...DriversTrueInformation]           
              // state.adminOrders = [];
            })
            .addCase(fetchDrivers.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
              });
            }
  })

  export const { setDrivers,setDriversCarded } = DriversMonitorSlice.actions;

  export const selectAllDrivers = (state) => state.driverMonitor.Drivers;
  export const getDriversCarded = (state) => state.driverMonitor.DriversCarded;
  
  export default DriversMonitorSlice.reducer;
  