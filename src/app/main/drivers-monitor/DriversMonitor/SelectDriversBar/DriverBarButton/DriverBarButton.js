import React from 'react'
import { useDispatch,useSelector } from "react-redux";
import { getDriversCarded,setDriversCarded} from "app/store/driverMonitor/driverMonitor";
import Box from '@material-ui/core/Box';
import SvgIcon from '@material-ui/core/SvgIcon';
import WhereToVoteSharpIcon from '@material-ui/icons/WhereToVoteSharp';

const DriverBarButton=(props)=>{
    const dispatch=useDispatch()
    const ShowCarded=useSelector(getDriversCarded)

    const clickHandler=()=>{
        dispatch(setDriversCarded(!ShowCarded))
    }



    return(
        <button style={{...props.Style,
                        border: 'none',}}
                onClick={()=>clickHandler()}>
            <WhereToVoteSharpIcon sx={{ color: 'red' }}
                                  fontSize="large">Drivers</WhereToVoteSharpIcon>
        </button>
    )
}

export default DriverBarButton