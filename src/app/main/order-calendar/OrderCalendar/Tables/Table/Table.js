import React from 'react'
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Table from "@material-ui/core/Table";
import TableCell from "@material-ui/core/TableCell";
import FuseScrollbars from "@fuse/core/FuseScrollbars";
import TableBody from "@material-ui/core/TableBody";
import Paper from "@material-ui/core/Paper"
import { TableContainer } from '@material-ui/core';

const Days = {
    0: "SUN",
    1: "MON",
    2: "TUE",
    3: "WED",
    4: "THU",
    5: "FRI",
    6: "SAT",
  };


const SimpleTable=(props)=>{
    return(
        <Paper sx={{ overflow: props.Overflow }}>
            <TableContainer style={{height:props.H?props.H:'auto',maxHeight:props.H?props.H:'none' }} >
                
                    <Table stickyHeader  className="my-12" aria-labelledby="tableTitle"> 
                            
                                <TableHead>
                                    <TableRow className="h-20  cursor-pointer" >
                                        <TableCell
                                                    className="p-1 bg-blue  text-center font-bold"
                                                    colSpan={3}                             
                                                >
                                                {Days[props.Date.getDay()]+','+props.Date.getDate()}
                                            </TableCell>                  
                                    </TableRow >

                                      
                                </TableHead>
                                
                                <TableBody>
                                    <TableRow className="h-20  cursor-pointer" >
                                            {props.HeadTable.map(element=>{
                                                console.log(element.caption)
                                                return(
                                                <TableCell
                                                    className="text-center font-bold"
                                                    component="th"
                                                    scope="row"
                                                    key={element.id}
                                                >
                                                    {element.caption}
                                                </TableCell> ) })}
                                        </TableRow>  

                                        {props.BodyTable.map(element=>{
                                            return(
                                                <TableRow className="h-56 cursor-pointer" hover tabIndex={-1}>
                                                <TableCell
                                                    className=" text-center font-bold"
                                                    component="th"
                                                    scope="row"
                                                    key={element.No}
                                                    >{element.No} </TableCell>
                                                    <TableCell
                                                    className="  text-center "
                                                    component="th"
                                                    scope="row"
                                                    key={element.No+element.Company}
                                                    >{element.Company} </TableCell>
                                                    <TableCell
                                                    className="text-center "
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