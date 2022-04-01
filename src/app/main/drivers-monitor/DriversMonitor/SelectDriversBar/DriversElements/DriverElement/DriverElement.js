import React,{useState,useEffect} from 'react'
import {Checkbox,FormControlLabel,IconButton,InputAdornment} from '@material-ui/core';
import {
    DivDriverElementS,
    DivDriverElementSecundaryS,
    DivDriverElementTheeryS,
    OrderCountS,
    ButtonDatePickerS,    
    H3S,
    OnlineSignal,
    LabelH4S} from './DriverElement.style'
import { DatePicker } from "@material-ui/pickers";
import Field from 'app/main/orders-admin/OrdersAdminForm/FormControls/Commons/Field/Field';
import {  MenuItem } from "@material-ui/core";
import { Controller,useForm, useFormContext,useFormState } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { CalendarToday } from "@material-ui/icons";
import StopsElements from './StopsElements/StopsElements';

const DriverElement=(props)=>{
    const [calendarDeployment,setCalendarDeployment]=useState(false)

  




    return(
        <DivDriverElementS>

                        <DivDriverElementSecundaryS padding> 
                            <DivDriverElementTheeryS>                           
                            <OnlineSignal Online= {props.Online} Color={props.Color}/>
                            <h5>{props.Online?"Online":"Offline"}</h5>
                        </DivDriverElementTheeryS> 

                        <DivDriverElementTheeryS>        
                            <H3S >{props.Name}</H3S>
                            <OrderCountS>{props.Ordenes}</OrderCountS> 
                        </DivDriverElementTheeryS>

         </DivDriverElementSecundaryS>

                      
       </DivDriverElementS>
            
    )
}
export default DriverElement