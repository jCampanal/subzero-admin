import React,{useState,Fragment, useEffect} from 'react'
import { BarDriversPrincipalS,BarDriversSecndari2S,BarDriversSecndari1S } from "./SelectDriversBar.style";
import DriversElements from "./DriversElements/DriversElements"
import FuseScrollbars from "@fuse/core/FuseScrollbars";
import { useSelector } from "react-redux";
import { getDriversCarded} from "app/store/driverMonitor/driverMonitor";
import DriverBarButton from './DriverBarButton/DriverBarButton';
const SelectDriversBar =(props)=>{

    const ShowCarded=useSelector(getDriversCarded)
    console.log(ShowCarded)

    

    return(
        <Fragment>
        <DriverBarButton Style={{position:'fixed',
                        display:'block',
                        right:'2.6%',
                        top:'80px',
                        zIndex:'999',}}
                        />
        <BarDriversPrincipalS clasName={"Drivers"} Selected={ShowCarded}>
        <FuseScrollbars className="block overflow-y-auto " enable={true}>
            <BarDriversSecndari2S>
            <DriverBarButton Style={{position:'relative',
                        display:'flex',
                        left:'1em',
                       }}/>
            </BarDriversSecndari2S>
            
            <BarDriversSecndari1S>
            
               <DriversElements Drivers={props.Drivers}/> 
               
            </BarDriversSecndari1S>
        </FuseScrollbars>
        </BarDriversPrincipalS>                
        </Fragment>
        
        
    )
}

export default SelectDriversBar