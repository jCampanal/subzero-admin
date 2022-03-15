import React,{useState,useEffect} from 'react'
import {Checkbox,FormControlLabel,IconButton,InputAdornment} from '@material-ui/core';

import {
    DivDriverElementS,
    DivDriverElementSecundaryS,
    FormS,
    OrderCountS,
    H3S,
    OnlineSignal,
    LabelH4S} from './DriverElement.style'
import { useTranslation } from "react-i18next";

const WharerhouseElement=(props)=>{
    const { t } = useTranslation("drivers-monitor");    



    return(
        <DivDriverElementS>
                        <DivDriverElementSecundaryS>
                        <FormControlLabel
                                    control={<Checkbox
                                               defaultChecked={props.Enable}
                                               onChange={props.Click}  /  >}
                                    label={<H3S>{props.Name}</H3S>}/>
                        </DivDriverElementSecundaryS>
                        
       </DivDriverElementS>
            
    )
}
export default WharerhouseElement