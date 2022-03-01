import React, { memo,useState,useEffect } from "react";
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
      if(element.enable)
      return(<Marker
        name={element.name}
        position={{lat: element.lat, lng: element.lng}} />)
    })
    setMarkerDrivers([...Marks])
}
},[Drivers])
  
  return (
    <div className="px-12">
      <h1 style={{position:'fixed',
                  background:'none',
                  top:'80px',
                  left:'28px',
                  margin:'none',
                  fontFamily: 'Poppins, Roboto, Helvetica Neue, Arial, sans-serif',
                  }}>{t("DRIVERS_MONITOR")}</h1>
      <Map
        google={props.google}
        zoom={10}
        containerStyle={{
          position: "fixed",
          width: "auto",
          height: "auto",
          top: "120px",
          right: "10px",
          bottom: "10px",
          left: "10px",
        }}
        style={{ position: "relative", width: "100%", height: "100%" }}
        initialCenter={{
          lat: 26.761681,
          lng: -81.191788,
        }}
      >
       {markerDrivers}   
      </Map>
      <SelectDriversBar Drivers={Drivers}/> 
    </div>
  );
}

export default memo(
  GoogleApiWrapper({
    apiKey: MapAPIKey,
    LoadingContainer: FuseLoading,
  })(DriversMonitor)
);
