import React, { memo,useState,useEffect,Fragment } from "react";
import GoogleMapReact from "google-map-react";
import { GoogleApiWrapper, Map, Marker } from "google-maps-react";
import { useTranslation } from "react-i18next";
import FuseLoading from "@fuse/core/FuseLoading";
import { MapAPIKey } from ".conf";
import SelectDriversBar from "./SelectDriversBar/SelectDriversBar";
import { useDispatch,useSelector } from "react-redux";
import { fetchDrivers } from "app/store/driverMonitor/driverMonitor";
import { selectAllDrivers} from "app/store/driverMonitor/driverMonitor";
import { showMessage } from "app/store/fuse/messageSlice";
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import {DivMap,DivMarker} from './DriversMonitor.style'
import AirportShuttleIcon from '@material-ui/icons/AirportShuttle';




function DriversMonitor(props) {
  const [isLoad,setIsLoad]=useState(true)
  const [markerDrivers,setMarkerDrivers]=useState(null)
  const { t } = useTranslation("drivers-monitor");
  const dispatch = useDispatch();
  const Drivers=useSelector(selectAllDrivers)
  
  console.log(Drivers)
  useEffect(()=>{    
    dispatch(fetchDrivers())
    .then(() => {
      setIsLoad(!isLoad);
      return null;
    })
    .catch((error) => {
      dispatch(
        showMessage({
          message: error.response.data.title ?? error.response.data.message,
          variant: "error",
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
        })
      );
    });
},[])

useEffect( ()=>{
  if(Drivers.length>0){
    const Marks= Drivers.map(element=>{      
      return(<DivMarker 
                  color={element.color}
                  Enable={element.enable}
                  lat={ element.lat}
                  lng={ element.lng}>
                <AirportShuttleIcon
                  sx={{color:element.color}}
                  name={element.name}
                  />
             </DivMarker>)
    })
    setMarkerDrivers([...Marks])
}
},[Drivers])
  
  return (
  <div>
    <div className="flex absolute m-0 box-border w-full h-full justify-center flex-col md:flex-row">
      <DivMap>
            < GoogleMapReact
              containerStyle={{
                boxSizing:' border-box',
                position:'relative',
                display:'block',
                width:'100%',
                height:'100%'
              }}
              
              bootstrapURLKeys={{ key: "" }}
              google={props.google}
              zoom={10}
              center={{
                lat: 26.761681,
                lng: -81.191788,
              }}
            >
            {markerDrivers} 

                  
             
              </ GoogleMapReact>
            </DivMap>
            
      <SelectDriversBar Drivers={Drivers}/> 
        
      </div>
    </div>
  );
}

export default memo(
  GoogleApiWrapper({
    apiKey: MapAPIKey,
    LoadingContainer: FuseLoading,
  })(DriversMonitor)
);
