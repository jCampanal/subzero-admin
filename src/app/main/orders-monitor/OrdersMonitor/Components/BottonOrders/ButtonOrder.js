import React from 'react'
import styled from 'styled-components'


const DivS=styled.div`
display:flex;
justify-content: center;
align-items: center;
align-self: center;`;

const ButtonS=styled.button`
border: 1px solid;
border-radius: 5px;
height:36px;
width:151px;
border-color: ${(props) => (props.Estate?'gray':'green')};
color: ${(props) => (props.Estate?'gray':'green')};
font-weight: 500;
transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
font-family-sans-serif: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
font-family-monospace: SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace;
display: flex;
justify-content: center;
align-items: center;
align-self: center;
&:hover{
    background-color:${(props) => (props.Estate?'gray':'green')};
    color:white;

}
&:focus{
    box-shadow:${(props) => (props.Estate?'2px 2px 5px #6793a6,-2px -2px 5px #6793a6,-2px 2px 5px #6793a6, 2px -2px 5px #6793a6'
                                        :'2px 2px 5px #2e6c42,-2px -2px 5px #2e6c42,-2px 2px 5px #2e6c42, 2px -2px 5px #2e6c42')}
}`;


const ButtonOrder=(props)=>{
    return(
    <DivS>
        <ButtonS
        Estate={props.Estate}
        onClick={props.Click}>
          {props.children}  
        </ButtonS>
    </DivS>
    )
}


export default ButtonOrder