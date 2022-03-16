import React,{useState,useEffect} from 'react'
import {Checkbox,FormControlLabel,IconButton,InputAdornment} from '@material-ui/core';
import {
    DivDriverElementS,
    DivDriverElementSecundaryS,
    FormS,
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
                            <FormControlLabel
                                    control={<Checkbox
                                               disabled={!props.Online} 
                                               defaultChecked={props.Enable&&props.Online}
                                               onChange={props.Click}  /  >}
                                    label={"Enable"}/>                               
                            <FormControlLabel
                                   control={ <OnlineSignal Online= {props.Online} Color={props.Color}/>}
                                    label={props.Online?"Online":"Offline"}/>
                           
                        </DivDriverElementSecundaryS>

                        <DivDriverElementSecundaryS>                            
                            <H3S >{props.Name+" "+props.LastName}</H3S>
                            <OrderCountS>{props.Ordenes}</OrderCountS>                            
                        </DivDriverElementSecundaryS>



                      
       </DivDriverElementS>
            
    )
}
export default DriverElement