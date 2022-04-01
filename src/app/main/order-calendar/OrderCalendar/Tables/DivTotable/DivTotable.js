import React, {Fragment} from 'react'
import SimpleTable from '../Table/Table'
import FuseScrollbars from "@fuse/core/FuseScrollbars";

const DivToTable=(props)=>{
    return(
        <Fragment>
            <div className=' mb-6 flex flex-row justify-evenly '>
                <div className=' w-2/5 '>
                        <SimpleTable 
                        H="350px"
                        Overflow='visible'
                        Date={props.Date[0]}
                        HeadTable={props.HeadTable[0]}
                        BodyTable={props.BodyTable[0]}/>
                </div>    
            
           
                <div className='w-2/5'>
                        <SimpleTable 
                        H="350px"
                        Overflow='hidden'
                        Date={props.Date[1]}
                        HeadTable={props.HeadTable[1]}
                        BodyTable={props.BodyTable[1]}/>
                </div>    
            </div>
        </Fragment>
    )

}

export default DivToTable