import React, { memo,useState,useEffect,Fragment } from "react";
import GoogleMapReact from "google-map-react";
import { GoogleApiWrapper, Map, Marker } from "google-maps-react";
import { useTranslation } from "react-i18next";
import FuseLoading from "@fuse/core/FuseLoading";
import { MapAPIKey } from ".conf";
import SelectDriversAndWharehouseBar from "./SelectDriversBar/SelectDriversBar";
import { useDispatch,useSelector } from "react-redux";
import { fetchAllDriversAndWharerhouses } from "app/store/driverMonitor/driverMonitor";
import {selectDriversByWharerhouse} from "app/store/driverMonitor/driverMonitor";
import { showMessage } from "app/store/fuse/messageSlice";
import {DivMap,DivMarker} from './DriversMonitor.style'
import AirportShuttleIcon from '@material-ui/icons/AirportShuttle';




function DriversMonitor(props) {
  const [isLoad,setIsLoad]=useState(true)
  const [markerDrivers,setMarkerDrivers]=useState(null)
  const { t } = useTranslation("drivers-monitor");
  const dispatch = useDispatch();
  const DriversByWharerhouse=useSelector(selectDriversByWharerhouse)
  let MAPTYPEID=0

  useEffect(()=>{    
    dispatch(fetchAllDriversAndWharerhouses())
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
  if(DriversByWharerhouse.length>0){
    const Marks= DriversByWharerhouse.map(element=>{
    return(element.Drivers.map(Pelement=>{      
      return(<DivMarker
                  key= {Pelement.name+element.color}
                  color={Pelement.color}
                  Enable={Pelement.enable && element.enable}
                  lat={ Pelement.lat}
                  lng={ Pelement.lng}>
                <AirportShuttleIcon
                  sx={{color:Pelement.color}}
                  name={Pelement.name}
                  />
             </DivMarker>)})
             )
    })
    setMarkerDrivers([...Marks])
}
},[DriversByWharerhouse])



  return (
  <div>
    <div className="flex absolute mx-0 my-1 box-border w-full h-full justify-center flex-col md:flex-row">
      {<DivMap>
            < GoogleMapReact
              containerStyle={{
                boxSizing:' border-box',
                position:'relative',
                display:'block',
                width:'100%',
                height:'100%'
              }}

              options={map => ({  mapTypeId: map.MapTypeId[MAPTYPEID],
                                  mapTypeControl: true,
                                  mapTypeControlOptions: {
                                      style: map.MapTypeControlStyle.HORIZONTAL_BAR,
                                      position: map.ControlPosition.TOP_LEFT,
                                      mapTypeIds: [
                                          map.MapTypeId.ROADMAP,
                                          map.MapTypeId.SATELLITE,
                                          map.MapTypeId.HYBRID
                                      ]
                                  } })}
              
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
            </DivMap>}
            
      <SelectDriversAndWharehouseBar /> 
        
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
