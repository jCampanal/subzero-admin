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
import InfoSing from './Components/InfoSings/InfoSings'
import ButtonOrder from './Components/BottonOrders/ButtonOrder'
import OrderCards from './Components/OrderCards/OrderCards'
import {days} from '../../../lib/formatDate'
import {   
    Checkbox,
    Select,
    MenuItem,
    FormControlLabel,
  } from "@material-ui/core";
import { openDialog } from "app/store/fuse/dialogSlice";
import { fetchDrivers } from "app/store/driverMonitor/driverMonitor";
import { selectAllDrivers} from "app/store/driverMonitor/driverMonitor";
import { showMessage } from "app/store/fuse/messageSlice"; 
import{
    OrdersCardsS,
    DriversCardsS,
    HeaderCardsS,
    DivBodyS
        }from './OrderMonitorStyled'



  
   
    

function OrdersMonitor() {
    const {t} = useTranslation('orders-monitor');
    const Orders=useSelector(selectOrders)
    const [filterStated,setFilterState]=useState(false)
    const [activate,setActivate]=useState(true)
    const dispatch = useDispatch();
    const Drivers=useSelector(selectAllDrivers)
    
    const HandlerButtonCompleted=()=>{
        setFilterState(!filterStated)
    }



    useEffect(()=>{    
        dispatch(fetchDrivers())
        .then(() => {        
          return null;
        })
        .catch((error) => {
          dispatch(
            showMessage({
              message: error.response.data.title ?? error.response.data.message,
              variant: "error",
              anchorOrigin: {
                vertical: "top",
                horizontal: "right",
              },
            })
          );
        });
    },[])


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
    useEffect(() => {
        document.title = "Order Monitor - Subzero Ice Services";
      }, []);
    useEffect(()=>{
        console.log('entro en la rutina')
        let Variable=false
        Orders.map((element)=>{
            console.log(element.state+'   '+element.Shipped)
            if(element.state==='Process'&&element.Shipped===true){
                Variable=true 
            }
        })
        setActivate(Variable)
    },[Orders])
    return (
        <div className='w-full h-full overflow-hidden'>
            <HeaderCardsS Activate={activate}>
                <InfoSing
                    TextHeader={t('TOTALS')}
                    BodyHeader={[t('RECEIVED'),t('PROCESS'),t('TOTAL')]}
                    BodyText={[ [Orders.filter((item) => !item.process).length,'gray'],
                                [Orders.filter((item) => item.process).length,'yellow'],
                                [Orders.length,'blue']]}
                    />

                <InfoSing
                    TextHeader={t(t('TOTAL_DRY_ICE'))}
                    Unity={'(lbs)'}
                    BodyHeader={[t('DRY_ICE'),t('PELLETS'),t('BLASTING')]}                    
                    BodyText={[ [0],[0],[0]]}/>
                
                <ButtonOrder
                    Estate={filterStated}
                    Click={HandlerButtonCompleted}>
                        {filterStated?t('ORDERS_IN_PROGRESS'):t('ORDERS_COMPLETED')}
                </ButtonOrder>
                
                
                <Button className="text-gray-500 hover:text-gray:200 mb-9 md:mb-0">{days[new Date().getDay()]+'  '+new Date().toLocaleString(t('CURRENT_LANGUAGE'))}</Button>
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
            </HeaderCardsS>
            
            
            < OrdersCardsS Activate={activate}>                

                {Orders.filter(element=>{
                    if(filterStated){
                        return(element.state==='Completed')
                    }else{
                        return(!(element.state==='Completed'))
                    }
                    
                })
                .map((item) => {
                    return(
                        <OrderCards
                        Drivers={Drivers}
                        item={item}
                        key={item.id}
                        CloseClick={HandleCancelBottom}
                        Change={HandlerChangeOrder}/>
                    )

                        
                })}
            
            </ OrdersCardsS>
            <DriversCardsS Activate={activate} >
                    
            </DriversCardsS>
            
        </div>
    );
}

export default memo(OrdersMonitor);
