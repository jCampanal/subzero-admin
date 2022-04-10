import React from 'react'
import styled from 'styled-components'
import {useTranslation} from 'react-i18next';

const DivS=styled.div`
display:flex;
justify-content: center;
align-items: center;
align-self: center;`;

const ButtonS=styled.button`
border: 1px solid;
border-radius: 5px;
min-height:38px;
width:83px;
border-color: #007bff;
color: #007bff;
font-weight: 500;
transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
font-family-sans-serif: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
font-family-monospace: SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace;
display: flex;
justify-content: center;
align-items: center;
align-self: center;
&:hover{
    background-color:#007bff;
    color:white;

}
&:focus{
    
}`;


const ProcessButton=(props)=>{
    const {t} = useTranslation('orders-monitor');

    return(
    <DivS>
        <ButtonS        
        onClick={props.Click}>
          {t('PROCESS')}  
        </ButtonS>
    </DivS>
    )
}


export default ProcessButton