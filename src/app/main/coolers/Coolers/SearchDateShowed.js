import React, {useState,useEffect} from 'react'
import Typography from "@material-ui/core/Typography";
import { motion } from "framer-motion";
import {CompringDate} from '../../../lib/formatDate'

const SearchDateShowed=(props)=>{
    const [DateFrom,setDateFrom]=useState('')
    const [DateTo,setDateTo]=useState('')


    useEffect(()=>{
        let dateFrom = new URLSearchParams(location.search).get("pickedUpFrom");
        let dateTo = new URLSearchParams(location.search).get("pickedUpTo"); 
        if ( dateTo && dateTo!=='') {  
            setDateTo(CompringDate(new Date(dateTo).getDate(),new Date(dateTo).getMonth(),new Date(dateTo).getFullYear()));            
          }else{
            setDateTo('')
          }
          if (dateFrom  === "" || !dateFrom ) {
            console.log(new Date().getDate()+'+'+new Date().getMonth()+'+'+new Date().getFullYear())
            console.log(new Date(new Date()))
            setDateFrom(CompringDate(new Date().getDate(),new Date().getMonth(),new Date().getFullYear()));
          }else{
            setDateFrom(CompringDate(new Date(dateFrom).getDate(),new Date(dateFrom).getMonth(),new Date(dateFrom).getFullYear()));   
          }
    })

    return (           
             <div style={{marginTop:'5px'}}
                onClick={props.Click}> 
            <Typography
                            component={motion.span}
                            initial={{ x: -20 }}
                            animate={{ x: 0, transition: { delay: 0.2 } }}
                            delay={300}
                            className="sm:flex text-16 md:text-24 mx-12 font-semibold">
             {DateTo&& <h2  style={{cursor:'pointer'}} >{DateFrom  +' - ' +DateTo}</h2>}
             {!DateTo&& <h2 style={{cursor:'pointer'}}>{DateFrom}</h2>}
            </Typography>
            </div>   
        
    )
}

export default SearchDateShowed