import styled,{css} from "styled-components";

export const DivDriverElementS=styled.div`
display:inline-block;
width:80%;
position:relative;
left:10%;
padding:10px 0px;
border-radius:10px;
margin: 5px 0px;
background-color: #fafafa;
box-shadow:1px 2px 2px #007bff,-1px 2px 2px #007bff,1px -2px 2px #007bff,-1px -2px 2px #007bff;
transition:all 225ms;
@media (min-width:960px){
  width:96%;
  left:2%;        
}`;

export const DivDriverElementSecundaryS=styled.div`
display:flex;
width:100%;
justify-content:${(props) => (props.padding ? "space-evenly" : "center")};
align-items: center;
${(props) =>
  props.padding &&
  css`
    padding-left:15%; 
  `} 
@media (max-width:960px ){
  ${(props) =>
    props.padding &&
    css`
      padding-left:5%; 
    `} 
@media (max-width: 530px){
  ${(props) =>
    props.padding &&
    css`
      padding-left:15%; 
        `}       
}
`;

export const FormS=styled.form`
display:${(props) => (props.Show ? "flex" : "none")};
flex-direction:column;
justify-content:space-around;
align-items: center;
width: 100%;`;

export const LabelH4S=styled.h4`
margin-top:10px;
`;

export const OnlineSignal=styled.div`
border:solid 2px #757575;
border-radius:100px;
width:18px;
height:18px;
background-color:${(props) => (props.Online ? props.Color : 'black')};
margin-right:8px;`;

export const H3S=styled.h3`
margin:2px; 
cursor:pointer;`;

export const OrderCountS = styled.span`
color: #fff;
background-color: #007bff;
display: flex;
align-items: center;
padding: 2px 6.4px;
font-size: 14px;
font-weight: 700;
text-align: center;
white-space: nowrap;
vertical-align: baseline;
border-radius: 4px;
`;

export const ButtonDatePickerS = styled.span`
  background-color: #039be5;
  color: rgb(255, 255, 255);
  padding: 6px 16px;
  font-size: 1.3rem;
  min-width: 64px;
  box-sizing: border-box;
  transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  font-family: Poppins, Roboto, "Helvetica", Arial, sans-serif;
  font-weight: 500;
  line-height: 1.75;
  border-radius: 18px;
  text-transform: none;
`;

export const SpanL=styled.span`
width:18px;
height:18px;
color:${(props) => (props.Online ? props.Color : 'black')};
margin-right:8px;`;