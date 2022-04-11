import React, {useState,useEffect,useRef} from 'react'
import Typography from "@material-ui/core/Typography";
import { motion } from "framer-motion";
import {CompringDate} from '../../../lib/formatDate'
import { SentimentDissatisfiedTwoTone } from '@material-ui/icons';
import { DatePicker } from "@material-ui/pickers";
import styled from "styled-components";
import {MuiPickersUtilsProvider,KeyboardDatePicker} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { formatDate } from "app/lib/formatDate";

const SearchDateShowed=(props)=>{
    const [DateFrom,setDateFrom]=useState('')
    const [DateTo,setDateTo]=useState('')
 

    useEffect(()=>{
        let dateFrom = new URLSearchParams(location.search).get("pickedUpFrom");
        let dateTo = new URLSearchParams(location.search).get("pickedUpTo"); 
        if ( dateFrom && dateFrom!=='') {  
            setDateFrom(CompringDate(new Date(dateFrom).getDate(),new Date(dateFrom).getMonth(),new Date(dateFrom).getFullYear()));            
          }else{
            setDateFrom(null)
          }
          console.log('dateTo')
          console.log(dateTo)
          if (dateTo  === "" || !dateTo ) {
            console.log('Date to')
            console.log(new Date().getDate()+'+'+new Date().getMonth()+'+'+new Date().getFullYear())
            console.log(new Date(new Date()))
            setDateTo(CompringDate(new Date().getDate(),new Date().getMonth(),new Date().getFullYear()));
          }else{
            setDateTo(CompringDate(new Date(dateTo).getDate(),new Date(dateTo).getMonth(),new Date(dateTo).getFullYear()));   
          }
    })
    
    

    return (  
      <>           
             <div style={{marginTop:'5px'}}
                onClick={()=>{document.getElementById('444').click()}}> 
            <Typography
                            component={motion.span}
                            initial={{ x: -20 }}
                            animate={{ x: 0, transition: { delay: 0.2 } }}
                            delay={300}
                            className="sm:flex text-16 md:text-24 mx-12 font-semibold">
             {DateFrom&& <h2  style={{cursor:'pointer'}} >{DateFrom  +' - ' +DateTo}</h2>}
             {!DateFrom&& <h2 style={{cursor:'pointer'}}>{DateTo}</h2>}
            </Typography>
            
            
            
            </div>  
            <DatePicker
            id='444'
            label={props.t("DATE_2")}
            
            className="hidden mt-8 mb-16 mx-4 DatePicker-cls"
            value={DateTo}
            onChange={(e) => props.searchByDate(null,formatDate(new Date(e)))}
            maxDate={new Date()}
            okLabel={<ButtonDatePickerS>{props.t("OK")}</ButtonDatePickerS>}
            cancelLabel={<ButtonDatePickerS>{props.t("CANCEL")}</ButtonDatePickerS>}
          /> 
      </>  
    )
}


const ButtonDatePickerS = styled.span`
  background-color: #039be5;

  color: rgb(255, 255, 255);
  padding: 6px 16px;
  font-size: 1.3rem;
  min-width: 64px;
  box-sizing: border-box;
  transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  font-family: Poppins, Roboto, "Helvetica", Arial, sans-serif;
  font-weight: 500;
  line-height: 1.75;
  border-radius: 18px;
  text-transform: none;
`;
export default SearchDateShowed