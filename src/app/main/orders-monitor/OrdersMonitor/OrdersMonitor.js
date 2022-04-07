import React, {memo,useState,useEffect} from 'react';
import {Button, TableCell} from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import {MuiPickersUtilsProvider, KeyboardDatePicker} from '@material-ui/pickers';
import {useTranslation} from 'react-i18next';
import IconButton from '@material-ui/core/IconButton';
import {Close} from '@material-ui/icons';
import FuseScrollbars from '@fuse/core/FuseScrollbars';
import Table from '@material-ui/core/Table';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import { useDispatch,useSelector } from "react-redux";
import { selectOrders,setOrdersinMonitor} from "app/store/OrderMonitor/OrderMonitorSlice";
import RemoveDlg from "app/common/removeDlg";
import {   
    Checkbox,
    Select,
    MenuItem,
    FormControlLabel,
  } from "@material-ui/core";
  import { openDialog } from "app/store/fuse/dialogSlice";



  
   
    

function OrdersMonitor() {
    const {t} = useTranslation('orders-monitor');
    const Orders=useSelector(selectOrders)
    const [filterStated,setFilterState]=useState(false)
    const dispatch = useDispatch();

    const HandlerButtonCompleted=()=>{
        setFilterState(!filterStated)
    }

    const HandlerChangeOrder=(id,field,value)=>{
        const item={...Orders.filter(element=>{return(element.id===id)})[0],[field]:value}
        console.log(item)
        const Matriz=Orders.map(element=>{
            if(element.id===id){
                return item
            }else{
                return element
            }
        })
        dispatch(setOrdersinMonitor(Matriz))
    }

    const acceptCancelOrder=(id)=>{        
        const Matriz=Orders.filter(element=>{
            return(!(element.id===id))
        })
        console.log(Matriz)
        dispatch(setOrdersinMonitor(Matriz))
    }

    const HandleCancelBottom=(id)=>{
        const element=Orders.filter(item=>{return(item.id===id)})[0]
    dispatch(
        openDialog({
          children: (
            <RemoveDlg
              itemId={element.id}
              proceedCallback={() => acceptCancelOrder(element.id)}
              dlgTitle={'WARNING'}
              dlgText={`You are going to cancel the order ${element.id}, ${element.customerCompany}. Proceed with the request?`}
            />
          ),
        })
      );
    }

    return (
        <div>
            <div className="bg-black text-gray-50 z-30 w-full py-12 px-24 grid grid-cols-1 md:grid-cols-5 items-center justify-between align-center fixed md:gap-7">
                <div className="text-center mb-9 md:mb-0">
                    <p className="text-lg font-bold">{t('TOTALS')}</p>
                    <div className="grid grid-cols-3 grid-rows-2 gap-1">
                        <span className="uppercase font-semibold text-blue-400">{t('RECEIVED')}</span>
                        <span className="uppercase font-semibold text-blue-400">{t('PROCESS')}</span>
                        <span className="uppercase font-semibold text-green-700">{t('TOTAL')}</span>
                        <span>{Orders.filter((item) => !item.process).length}</span>
                        <span>{Orders.filter((item) => item.process).length}</span>
                        <span>{Orders.length}</span>
                    </div>
                </div>
                <div className="text-center mb-9 md:mb-0">
                    <p className="text-lg font-bold">
                        {t('TOTAL_DRY_ICE')} <span className="text-gray-100">(lbs)</span>
                    </p>
                    <div className="grid grid-cols-3 grid-rows-2 gap-1">
                        <span className="uppercase font-semibold text-gray-50">{t('DRY_ICE')}</span>
                        <span className="uppercase font-semibold text-gray-50">{t('PELLETS')}</span>
                        <span className="uppercase font-semibold text-gray-50">{t('BLASTING')}</span>
                        <span>0</span>
                        <span>0</span>
                        <span>0</span>
                    </div>
                </div>
                <Button variant="contained" className={`bg-${filterStated?'gray-500':'green-500'} hover:bg-blue-700 text-white uppercase mb-9 md:mb-0`} onClick={HandlerButtonCompleted}>
                    {t('ORDERS_COMPLETED')}
                </Button>
                <Button className="text-gray-500 hover:text-gray:200 mb-9 md:mb-0">{new Date().toLocaleString(t('CURRENT_LANGUAGE'))}</Button>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                        className="bg-gray-100"
                        disableToolbar
                        variant="inline"
                        format="MM/dd/yyyy"
                        margin="normal"
                        onChange={() => null}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />
                </MuiPickersUtilsProvider>
            </div>
            <div className="h-96 mt-96 md:h-96 md:mt-0"></div>
            <div className="h-96 mt-96 md:h-0 md:mt-0"></div>
            <div className=" flex flex-col px-10 md:px-14 ">
                {Orders.filter(element=>{
                    if(filterStated){
                        return(element.state==='Completed')
                    }else{
                        return(!(element.state==='Completed'))
                    }
                    
                })
                .map((item) => (
                    <div key={item.id} className="mb-28 last:mb-0 p-14 shadow-lg bg-white rounded-lg border border-gray-200">
                        <div className="flex flex-row justify-between gap-16 p-5 mb-10">
                            <IconButton aria-label="Cancel the order" size="small" onClick={()=>{HandleCancelBottom(item.id)}}>
                                <Close />
                            </IconButton>
                            

                        </div>
                        <div className="flex flex-col gap-10">
                            <div className="grid grid-cols-1 sm:grid-cols-12 gap-7 sm:gap-20 content-start">
                                <FuseScrollbars className="flex-grow overflow-x-auto sm:col-span-4">
                                    <Table aria-labelledby="tableTitle">
                                        <TableHead>
                                            <TableRow className={`h-40 bg-${item.state==='Completed'?'blue-500':item.state==='Shipping'?'yellow-500':'gray-500'}`}>
                                                <TableCell colSpan={2} className="px-4 md:px-0 text-center" component="th" scope="row" padding="none">
                                                    {'ID: '+item.id}
                                                </TableCell>
                                                
                                            </TableRow>
                                            <TableRow className="h-40">
                                                <TableCell className="px-4 md:px-0" component="th" scope="row" padding="none">
                                                    {t('CUSTOMER')}
                                                </TableCell>
                                                <TableCell className="px-4 md:px-0" component="th" scope="row" padding="none">
                                                    {t('SHIPMENT')}
                                                </TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            <TableRow hover className="h-32">
                                                <TableCell className="px-4 md:px-0" component="th" scope="row" padding="none">
                                                    {item.customerCompany}
                                                </TableCell>
                                                <TableCell className="px-4 md:px-0" component="th" scope="row" padding="none">
                                                    {item.shippingAddress}
                                                </TableCell>
                                            </TableRow>
                                            <TableRow hover className="h-32">
                                                <TableCell className="px-4 md:px-0" component="th" scope="row" padding="none">
                                                    {item.customerName}
                                                </TableCell>
                                                <TableCell className="px-4 md:px-0" component="th" scope="row" padding="none">
                                                    {item.shippingTime.toLocaleString(t('CURRENT_LANGUAGE'))}
                                                </TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </FuseScrollbars>
                                <FuseScrollbars className="flex-grow overflow-x-auto sm:col-span-8">
                                    <Table aria-labelledby="tableTitle">
                                        <TableHead>
                                            <TableRow className="h-40">
                                                <TableCell className="px-4 md:px-0" component="th" scope="row" padding="none">
                                                    {t('PRODUCT')}
                                                </TableCell>
                                                <TableCell className="px-4 md:px-0" component="th" scope="row" padding="none">
                                                    {t('QUANTITY')}
                                                </TableCell>
                                                <TableCell className="px-4 md:px-0" component="th" scope="row" padding="none">
                                                    {t('DESCRIPTION')}
                                                </TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {item.products.map((product) => (
                                                <TableRow hover className="h-32">
                                                    <TableCell className="px-4 md:px-0" component="th" scope="row" padding="none">
                                                        {product.name}
                                                    </TableCell>
                                                    <TableCell className="px-4 md:px-0" component="th" scope="row" padding="none">
                                                        {product.quantity}
                                                    </TableCell>
                                                    <TableCell className="px-4 md:px-0" component="th" scope="row" padding="none">
                                                        {product.description}
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>

                                </FuseScrollbars>
                            </div>
                                <div className="flex justify-between items-center">
                                
                                    <p className="text-base font-semibold uppercase">Ref:{item.ref}</p>
                                    {item.state==='Shipping'&&<Button variant="contained" className="bg-blue-500 w-1/5 self-end hover:bg-blue-700 text-white" onClick={()=>{HandlerChangeOrder(item.id,'state','Process')}}>
                                                                {t('PROCESS')}
                                                             </Button>}
                                    {item.state==='Process'&&<span className="flex items-center ">
                                                                  <FormControlLabel
                                                                        className="mt-8 mb-16"
                                                                        id="Deliver"
                                                                        
                                                                        control={
                                                                        <Checkbox
                                                                            checked={item.Shipped}
                                                                            enable={!(item.Deliver==='')}
                                                                            onChange={(e) => HandlerChangeOrder(item.id,'Shipped',e.target.checked)}
                                                                        />
                                                                        }
                                                                        label={<span style={{ fontSize: "16px" }}>{'Deliver'}</span>}
                                                                    />

                                                                    <Select
                                                                            className=" h-1/2 w-1/2"
                                                                            name={'Driver'}
                                                                            id={'Select'+item.id}
                                                                            variant="outlined"
                                                                            onChange={(e) => HandlerChangeOrder(item.id,'Deliver',e.target.value)}
                                                                            value={item.Deliver}                                                                            
                                                                                >
                                                                                <MenuItem key="null" value="">{''}</MenuItem>   
                                                                                <MenuItem key="Driver2" value="Driver1">{'Driver1'}</MenuItem>
                                                                                <MenuItem key="Driver2" value="Driver2">{'Driver2'}</MenuItem>
                                                                                <MenuItem key="Driver2" value="Driver3">{'Driver3'}</MenuItem>
                                                                                <MenuItem key="Driver2" value="Driver4">{'Driver4'}</MenuItem>
                                                                                    
                                                                </Select>
                                                                
                                                             </span>}
                               </div>
                                
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default memo(OrdersMonitor);
