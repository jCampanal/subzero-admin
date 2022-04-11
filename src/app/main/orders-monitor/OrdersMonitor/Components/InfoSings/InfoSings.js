import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Table from "@material-ui/core/Table";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Paper from "@material-ui/core/Paper"
import { TableContainer } from '@material-ui/core';
import styled from 'styled-components'

const StrongS=styled.strong`
font-weight: 600;
font-size: 1.4rem;
line-height: 1.5;
font-family:sans-serif;`;

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
                                                    className="text-white p-0  text-center font-bold border-r-transparent border-t-transparent border-l-transparent border-b-gray"
                                                    style={{borderColor:'#454d55'}}
                                                    colSpan={3}                             
                                                >
                                                <StrongS className=" font-bold p-0">{props.TextHeader}</StrongS>
                                                <span className=" font-bold text-gray p-0">{props.Unity?" "+props.Unity:''}</span>
                                            </TableCell>                  
                                    </TableRow >

                                    <TableRow className="h-10  cursor-pointer" >
                                            {props.BodyHeader.map((element,index)=>{
                                                return(
                                                <TableCell
                                                    className="text-center py-2 text-white px-px font-bold border-r-transparent border-t-transparent border-l-transparent border-b-gray"
                                                    component="th"
                                                    style={{borderColor:'#454d55'}}
                                                    scope="row"
                                                    key={'BodyHeader'+index}
                                                >
                                                    <StrongS className="font-semibold ">
                                                        {element}
                                                    </StrongS>
                                                </TableCell> )
                                            })  }                     
                                                
                                    </TableRow> 
                                    <TableRow className="h-6  cursor-pointer" >
                                            {props.BodyText.map((element,index)=>{
                                                return(
                                                <TableCell
                                                    className="text-center px-px py-2 border-transparent font-bold"
                                                    component="th"
                                                    scope="row"
                                                    key={'BodyHeader'+index}
                                                >
                                                    <StrongS className={` font-semibold text-${element[1]?element[1]:'gray'}`}>
                                                        {element[0]}
                                                    </StrongS>
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