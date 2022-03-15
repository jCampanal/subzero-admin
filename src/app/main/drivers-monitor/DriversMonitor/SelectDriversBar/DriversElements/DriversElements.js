import React,{useState,useEffect} from 'react'
import DriverElement from './DriverElement/DriverElement'
import { setDrivers} from "app/store/driverMonitor/driverMonitor";
import { setDriversAndWharerhouses,selectDriversByWharerhouse} from "app/store/driverMonitor/driverMonitor";
import { useDispatch,useSelector } from "react-redux";



const DriversElements=(props)=>{
    const dispatch=useDispatch()
    const DriversAndWharerhouses=useSelector(selectDriversByWharerhouse)
    const [Drivers,setDrivers]=useState(null)

    const handlerChangeCheckbox=(id,wid)=>{

        let changedWharehouse=DriversAndWharerhouses.find(element=>{return(element.id===wid)})
        if(changedWharehouse){
        let changedDriver=changedWharehouse.Drivers.find(element=>{return(element.id===id)})
                if(changedDriver){
                    changedDriver={...changedDriver,enable:!changedDriver.enable}
                    const newDrivers=changedWharehouse.Drivers.map(element=>{
                        if(element.id===changedDriver.id){
                            return changedDriver
                        }else{
                            return element
                        }  
                    })
                    changedWharehouse={...changedWharehouse,Drivers:newDrivers}
                    console.log( "changedWharehouse")
                    console.log( changedWharehouse)
                    const newList=DriversAndWharerhouses.map(element=>{
                        if(element.id===changedWharehouse.id){
                            console.log("lo encontro")
                            return changedWharehouse
                        }else{
                            return element
                        }
                    })
                    console.log(newList)
                    dispatch(setDriversAndWharerhouses(newList))
                }
            }
    }
    useEffect(()=>{
        let MDrivers=DriversAndWharerhouses.map(element=>{
            return(element.Drivers.map(Pelement=>{
                return(
                    <DriverElement key={Pelement.id} 
                                   Enable={Pelement.enable}
                                   Id={Pelement.id}
                                   ClickEnable={()=>{}}
                                   WEnable={element.enable}
                                   Name={Pelement.name}
                                   Online={Pelement.online}
                                   Color={Pelement.color}
                                   Ordenes={'2'}
                                   Stops={['Parque El Curita','Santiago de las vegas']}
                                   Click={()=>handlerChangeCheckbox(Pelement.id,element.id)}/>
                 )
            }))
            
        })
        setDrivers(MDrivers)    
    },[DriversAndWharerhouses])
    
    return(Drivers)
}

export default DriversElements