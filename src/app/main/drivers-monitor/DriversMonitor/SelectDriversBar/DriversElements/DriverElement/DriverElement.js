import React from 'react'
import {Checkbox,FormControlLabel} from '@material-ui/core';

const DriverElement=(props)=>{



    return(
        <div style={{
                    display:'block',
                    width:'80%',
                    position:'relative',
                    left:'10%',
                    padding:'10px 0px',
                    margin: '3px 0',
                    textAlign:'center',
                    borderRadius:'10px',
                    }}>

                        <h3 style={{margin:'2px'}}>{props.Name}</h3>
                        <div style={{
                                     display:'flex',
                                     justifyContent:'space-around',
                                     alignItems: 'center',
                                     width: '100%'

                        }}>                                  
                                    
                                    <FormControlLabel
                                    control={ <div style={{border:'solid 2px #757575',
                                                           borderRadius:'100px',
                                                           width:'18px',
                                                           height:'18px',
                                                           backgroundColor:props.Online?props.Color:'black',
                                                           marginRight:'12px'
                                                            }}/>}
                                    label={"Online"}/>
                                    <FormControlLabel
                                    control={<Checkbox
                                               disabled={!props.Online} 
                                               defaultChecked={props.Enable&&props.Online}
                                               onChange={props.Click}  /  >}
                                    label={"Enable"}/>
                            
                        </div>
        </div>
            
    )
}
export default DriverElement