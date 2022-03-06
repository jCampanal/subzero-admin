import React from 'react'
import {StopDivS,H4S} from './StopsElement.style'

const StopsElements=(props)=>{
    return(
        <StopDivS>
           <H4S>{props.children}</H4S> 
        </StopDivS>
    )
}

export default StopsElements