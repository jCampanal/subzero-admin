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
min-height:36px;
width:78px;
border-color: #007bff;
color: #007bff;
font-weight: 400;
font-size: 1.37rem;
line-height: 1.9;
font-family:sans-serif;
display: flex;
justify-content: center;
align-items: center;
align-self: center;
&:hover{
    background-color:#007bff;
    color:white;
    font-weight: 500;
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