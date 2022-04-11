import React, {memo,useState,useEffect} from 'react';
import {Button, TableCell} from '@material-ui/core';
import {useTranslation} from 'react-i18next';
import IconButton from '@material-ui/core/IconButton';
import {Close} from '@material-ui/icons';
import FuseScrollbars from '@fuse/core/FuseScrollbars';
import Table from '@material-ui/core/Table';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import ProcessButton from './ProcessButton/ProcessButton'
import { selectOrders,setOrdersinMonitor} from "app/store/OrderMonitor/OrderMonitorSlice";
import { useDispatch,useSelector } from "react-redux";
import { selectAllDrivers} from "app/store/driverMonitor/driverMonitor";
import {   
    Checkbox,
    Select,
    MenuItem,
    FormControlLabel,
  } from "@material-ui/core";
import styled from 'styled-components';

const SpanS=styled.span`
font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
font-size: ${(props) => (props.Size?props.Size:'1.6')}rem;
font-weight: ${(props) => (props.Bold?'bold':'400')};
line-height: 1.5;`;

const OrderCards=(props)=>{
    const {t} = useTranslation('orders-monitor');
    const Drivers=selectAllDrivers
    console.log(props.Drivers)
    return(

        <div key={props.item.id} className="mb-28 last:mb-0 p-5 shadow-lg bg-white rounded-lg border border-gray-200">
        <div className="flex flex-row justify-between gap-16 p-5 mb-10">
                            <IconButton aria-label="Cancel the order" size="small" onClick={()=>{props.CloseClick(props.item.id)}}>
                                <Close />
                            </IconButton>
                            

        </div>

        <div className="flex flex-row gap-10">
            
                <div className='flex  flex-col w-1/2 items-center justify-items-center justify-center'>
                <Table aria-labelledby="tableTitle" className="mb-9 w-11/12">
                    <TableHead>
                        <TableRow className={`h-20`}>
                            <TableCell  className="px-8 py-4  text-left border-2 "   >
                                <SpanS Bold>{'ID'}</SpanS>
                            </TableCell>                            
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow className={`h-16`}>
                            <TableCell  className={`px-8 py-4  text-left  text-white border-2`} 
                            style={{backgroundColor:props.item.state==='Completed'?'#17a2b8':props.item.state==='Shipping'?'#ffc107':'#6c757d'}}>
                            <SpanS Size={'2'}  Bold>{props.item.id}</SpanS>
                            </TableCell> 
                        </TableRow>
                    </TableBody>
                </Table>
             
            <FuseScrollbars className="flex-grow overflow-x-auto sm:col-span-4 w-11/12">
                <Table aria-labelledby="tableTitle " className='w-full'>
                    <TableHead>
                        <TableRow className="h-40">
                            <TableCell className="px-8 font-bold py-4 border-2" >
                                {t('CUSTOMER')}
                            </TableCell>
                            <TableCell className="px-8 font-bold py-4 border-2" >
                                {t('SHIPMENT')}
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow hover className="h-32">
                            <TableCell className="px-8 py-4 border-2" component="th" scope="row" >
                                <SpanS Size={'2'}>{props.item.customerCompany}</SpanS>
                            </TableCell>
                            <TableCell className="px-8 py-4 border-2" component="th" scope="row" >
                                <SpanS Size={'2'}>{props.item.shippingAddress}</SpanS>
                            </TableCell>
                        </TableRow>
                        <TableRow hover className="h-32">
                            <TableCell className="px-8 py-4 border-2" component="th" scope="row" >
                                <SpanS Size={'2'}>{props.item.customerName}</SpanS>
                            </TableCell>
                            <TableCell className="px-8 py-4 border-2" component="th" scope="row" >
                                <SpanS Size={'2'}>{props.item.shippingTime.toLocaleString(t('CURRENT_LANGUAGE'))}</SpanS>
                            </TableCell>
                        </TableRow>
                        <TableRow hover className="h-32">
                            <TableCell className="px-8 py-4 border-2" component="th" scope="row" >
                                <SpanS Size={'2'}>Ref:{props.item.ref}</SpanS>
                            </TableCell>
                            <TableCell className="px-8 py-4 border-2 flex items-left" component="th" scope="row" >
                            {props.item.state==='Shipping'&&
                                    
                                        <ProcessButton  Click={()=>{props.Change(props.item.id,'state','Process')}}>
                                            
                                         </ProcessButton>
                                    }
                            {props.item.state==='Process'&&<span className="flex items-center ">
                                              <FormControlLabel
                                                    className="px-8 py-4 border-0"
                                                    id="Deliver"
                                                    
                                                    control={
                                                    <Checkbox
                                                        checked={props.item.Shipped}
                                                        
                                                        onChange={(e)=>{props.Change(props.item.id,'Shipped',e.target.checked)}}
                                                    />
                                                    }
                                                    label={<span style={{ fontSize: "16px" }}>{'Deliver'}</span>}
                                                />
                                                
                                                <Select
                                                        className="max-h-36 h-4/6 min-w-max border-0"
                                                        style={{minWidth:'120%'}}
                                                        name={'Driver'}
                                                        disabled={!props.item.Shipped}
                                                        id={'Select'+props.item.id}
                                                        variant="outlined"
                                                        onChange={(e)=>{props.Change(props.item.id,'Deliver',e.target.value)}}
                                                        value={props.item.Deliver}                                                                            
                                                            >
                                                            <MenuItem key="null" value="">{''}</MenuItem>
                                                            {props.Drivers.map(element=>{
                                                                return(<MenuItem key={'MenuIT'+element.id} value={element.id}>{element.name}</MenuItem>)
                                                            })}   
                                                            
                                                                
                                            </Select>
                                            
                                         </span>}
                            </TableCell>
                        </TableRow>
                    </TableBody>
                
                
                </Table>
            </FuseScrollbars>
        </div>
        <div className='w-1/2 items-center'>
            <FuseScrollbars className="flex-grow overflow-x-auto sm:col-span-8">
                <Table aria-labelledby="tableTitle " className='w-11/12 items-center'>
                    <TableHead>
                        <TableRow className="h-40">
                            <TableCell className="px-8 py-4 font-bold border-t-2" component="th" scope="row" >
                                {t('PRODUCT')}
                            </TableCell>
                            <TableCell className="px-8 py-4 font-bold border-t-2" component="th" scope="row" >
                                {t('QUANTITY')}
                            </TableCell>
                            <TableCell className="px-8 py-4 font-bold border-t-2" component="th" scope="row" >
                                {t('DESCRIPTION')}
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.item.products.map((product) => (
                            <TableRow hover className="h-32">
                                <TableCell className="px-8 py-4 " component="th" scope="row" style={{backgroundColor:'#ffeeba'}}>
                                    <SpanS Size={'2'} Bold>{product.name}</SpanS>
                                    <SpanS Size={'2'} Bold>{'(5Lb)'}</SpanS>
                                </TableCell>
                                <TableCell className="px-8 py-4 " component="th" scope="row" style={{backgroundColor:'#ffeeba'}}>
                                    <SpanS Size={'2'} Bold>{product.quantity}</SpanS>
                                    <SpanS style={{color:'gray'}}>{'(16Lb)'}</SpanS>
                                </TableCell>
                                <TableCell className="px-8 py-4 " component="th" scope="row" style={{backgroundColor:'#ffeeba'}}>
                                    <SpanS Size={'2'} >{product.description}</SpanS>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

                </FuseScrollbars>
            </div>
            
            
            
                
                
        </div>
            
    </div>
            
    )
}

export default OrderCards


