import React from 'react'
import DriverElement from './DriverElement/DriverElement'
import { setDrivers} from "app/store/driverMonitor/driverMonitor";
import { useDispatch } from "react-redux";


const DriversElements=(props)=>{
    const dispatch=useDispatch()

    const handlerChangeCheckbox=(id)=>{

        let changedDriver=props.Drivers.find(element=>{return(element.id===id)})
        if(changedDriver){
            changedDriver={...changedDriver,enable:!changedDriver.enable}
            const newDrivers=props.Drivers.map(element=>{
                if(element.id===changedDriver.id){
                    return changedDriver
                }else{
                    return element
                }
            })
            console.log(newDrivers)
            dispatch(setDrivers(newDrivers))
        }
    }
    let MDrivers=props.Drivers.map(element=>{
        return(
           <DriverElement key={element.id} 
                          Enable={element.enable}
                          Id={element.id}
                          ClickEnable={()=>{}}
                          Name={element.name}
                          LastName={element.LastName}
                          Online={element.online}
                          Color={element.color}
                          Ordenes={'2'}
                          Stops={['Parque El Curita','Santiago de las vegas']}
                          Click={()=>handlerChangeCheckbox(element.id)}/>
        )
    })
    return(MDrivers)
}

export default DriversElements