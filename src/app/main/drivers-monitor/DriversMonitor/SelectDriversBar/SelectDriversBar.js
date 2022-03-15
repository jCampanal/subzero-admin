import React,{useState,Fragment, useEffect} from 'react'
import { BarDriversPrincipalS,BarDriversSecndari2S,BarDriversSecndari1S,LabelS } from "./SelectDriversBar.style";
import DriversElements from "./DriversElements/DriversElements"
import WharerhouseElements from "./WharehouseElements/WharehouseElements"
import FuseScrollbars from "@fuse/core/FuseScrollbars";
import { useSelector } from "react-redux";
import { getDriversCarded} from "app/store/driverMonitor/driverMonitor";
import AirportShuttleIcon from '@material-ui/icons/AirportShuttle';
import Home from '@material-ui/icons/Home';

import { useTranslation } from "react-i18next";
import WarehouseForm from 'app/main/warehouses/WarehouseForm/WarehouseForm';
const SelectDriversBar =(props)=>{
    const { t } = useTranslation("drivers-monitor");
    const ShowCarded=useSelector(getDriversCarded)
    console.log(ShowCarded)

    

    return(
        <Fragment>
        < BarDriversPrincipalS>
            

            <FuseScrollbars className="flex-grow overflow-y-auto ">
                <LabelS>
                    <AirportShuttleIcon className="mr-5" fontSize="large" />
                    <h1>{t("DRIVER")}</h1>
                </LabelS>
                <BarDriversSecndari1S>                
                <DriversElements/>                
                </BarDriversSecndari1S>
                <LabelS>
                    <Home className="mr-5" fontSize="large" />
                    <h1>{"Warehouse"}</h1>
                </LabelS>
                <BarDriversSecndari1S>                
                <WharerhouseElements/>                
                </BarDriversSecndari1S>
            </FuseScrollbars>
       
        </BarDriversPrincipalS>               
        </Fragment>
        
        
    )
}

export default SelectDriversBar