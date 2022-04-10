import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Table from "@material-ui/core/Table";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Paper from "@material-ui/core/Paper"
import { TableContainer } from '@material-ui/core';
import styled from 'styled-components'


const DivS=styled.div`
display:flex;
justify-content: center;
align-items: center;
align-self: center;`;

const InfoSing=(props)=>{
    return(
        <DivS>
        <TableContainer  className="text-center w-11/12 mb-9 md:mb-0 text-gray">
            <Table  aria-labelledby="tableTitle"> 
                            
                                <TableBody>
                                    <TableRow className="h-6" >
                                        <TableCell
                                                    className="text-white p-0 text-center font-bold border-r-transparent border-t-transparent border-l-transparent border-b-gray-500"
                                                    colSpan={3}                             
                                                >
                                                <span className=" font-bold p-0">{props.TextHeader}</span>
                                                <span className=" font-bold text-gray p-0">{props.Unity?props.Unity:''}</span>
                                            </TableCell>                  
                                    </TableRow >

                                    <TableRow className="h-10  cursor-pointer" >
                                            {props.BodyHeader.map((element,index)=>{
                                                return(
                                                <TableCell
                                                    className="text-center text-white py-2 px-px font-bold border-r-transparent border-t-transparent border-l-transparent border-b-gray-500"
                                                    component="th"
                                                    scope="row"
                                                    key={'BodyHeader'+index}
                                                >
                                                    <span className="font-semibold ">
                                                        {element}
                                                    </span>
                                                </TableCell> )
                                            })  }                     
                                                
                                    </TableRow> 
                                    <TableRow className="h-6  cursor-pointer" >
                                            {props.BodyText.map((element,index)=>{
                                                return(
                                                <TableCell
                                                    className="text-center py-2 px-px border-transparent font-bold"
                                                    component="th"
                                                    scope="row"
                                                    key={'BodyHeader'+index}
                                                >
                                                    <span className={` font-semibold text-${element[1]?element[1]:'gray'}`}>
                                                        {element[0]}
                                                    </span>
                                                </TableCell> )
                                            })}                       
                                                
                                    </TableRow>
                                </TableBody> 
            </Table> 
    </TableContainer>
    </DivS>    
    )

}
export default InfoSing