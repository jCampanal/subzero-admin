import React from 'react'
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Table from "@material-ui/core/Table";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Paper from "@material-ui/core/Paper"
import { TableContainer } from '@material-ui/core';

const Days = {
    0: "SUNDAY",
    1: "MONDAY",
    2: "TUESDAY",
    3: "WEDNESDAY",
    4: "THURSDAY",
    5: "FRIDAY",
    6: "SATURDAY",
  };


const SimpleTable=(props)=>{
    return(
        <Paper className="my-12 " sx={{ overflow: props.Overflow }}>
            <TableContainer style={{maxHeight:props.H?props.H:'none' }} >
                
                    <Table stickyHeader  aria-labelledby="tableTitle"> 
                            
                                <TableHead>
                                    <TableRow className="h-16  cursor-pointer" >
                                        <TableCell
                                                    className="p-1 bg-blue text-white text-center font-bold"
                                                    colSpan={3}                             
                                                >
                                                {Days[props.Date.getDay()]+','+props.Date.getDate()}
                                            </TableCell>                  
                                    </TableRow >

                                      
                                </TableHead>
                                
                                <TableBody>
                                    <TableRow className="h-6  cursor-pointer" >
                                            {props.HeadTable.map(element=>{
                                                console.log(element.caption)
                                                return(
                                                <TableCell
                                                    className="text-left py-2 font-bold"
                                                    component="th"
                                                    scope="row"
                                                    key={element.id}
                                                >
                                                    {element.caption}
                                                </TableCell> ) })}
                                        </TableRow>  

                                        {props.BodyTable.map((element,index)=>{
                                            return(
                                                <TableRow className={`h-6 cursor-pointer bg-${index%2===1?'white':'gray-200'}`} hover tabIndex={-1}>
                                                <TableCell
                                                    className=" text-left h-6 py-0 font-bold"
                                                    component="th"
                                                    scope="row"
                                                    key={element.No}
                                                    >{element.No} </TableCell>
                                                    <TableCell
                                                    className=" h-6 py-0 text-left "
                                                    component="th"
                                                    scope="row"
                                                    key={element.No+element.Company}
                                                    >{element.Company} </TableCell>
                                                    <TableCell
                                                    className="text-left py-0 "
                                                    component="th"
                                                    scope="row"
                                                    key={element.No+element.time}
                                                    >{element.time} </TableCell>
                                                </TableRow>  ) })}  
                                        
                                </TableBody>
                                
                            </Table >
                    
            </TableContainer>
        </Paper>
    )

}

export default SimpleTable