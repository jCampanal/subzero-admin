import React from 'react'
import styled from 'styled-components'


const DivS=styled.div`
display:flex;
justify-content: center;
align-items: center;
align-self: center;`;

const ButtonS=styled.button`
display:inline-block;
border: 1px solid;
border-radius: 5px;
padding: .4rem .75rem;
border-color: ${(props) => (props.Estate?'#6c757d':'#28a745')};
color: ${(props) => (props.Estate?'#6c757d':'#28a745')};
font-weight: 400;
font-size: 1.37rem;
line-height: 1.7;
transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
font-family:sans-serif;
display: flex;
justify-content: center;
align-items: center;
align-self: center;
&:hover{
    background-color:${(props) => (props.Estate?'#6c757d':'#28a745')};
    color:white;
    font-weight: 500;
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