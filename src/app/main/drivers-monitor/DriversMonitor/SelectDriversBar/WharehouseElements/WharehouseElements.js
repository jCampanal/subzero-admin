import React,{useEffect,useState} from 'react'
import WharerhouseElement from './WharerhouseElement/WharerhouseE';
import { setDriversAndWharerhouses,selectDriversByWharerhouse} from "app/store/driverMonitor/driverMonitor";
import { useDispatch,useSelector } from "react-redux";



const WharerhousesElements=(props)=>{
    console.log("Entro Aqui")
    const dispatch=useDispatch()
    const DriversAndWharerhouses=useSelector(selectDriversByWharerhouse)
    const [Wharerhouse,setWharerhouses]=useState(null)

    const handlerChangeCheckbox=(id)=>{

        let changedWharerhouses=DriversAndWharerhouses.find(element=>{return(element.id===id)})
        if(changedWharerhouses){
            changedWharerhouses={...changedWharerhouses,enable:!changedWharerhouses.enable}
            const newWharerhouses=DriversAndWharerhouses.map(element=>{
                if(element.id===changedWharerhouses.id){
                    return changedWharerhouses
                }else{
                    return element
                }
            })
            console.log(newWharerhouses)
            dispatch(setDriversAndWharerhouses(newWharerhouses))
        }
    }
 useEffect(()=>{
    let MWharerhouses=DriversAndWharerhouses.map(element=>{        
        return(
           <WharerhouseElement key={element.id} 
                                Enable={element.enable}
                                Id={element.id}
                                Name={element.name}                         
                                Click={()=>handlerChangeCheckbox(element.id)}/>
        )
    })
    setWharerhouses(MWharerhouses)

 },[DriversAndWharerhouses])


    return(Wharerhouse)
}

export default WharerhousesElements