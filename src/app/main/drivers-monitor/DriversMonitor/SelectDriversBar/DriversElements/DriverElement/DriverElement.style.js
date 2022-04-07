import styled,{css} from "styled-components";

export const DivDriverElementS=styled.div`
display:inline-block;
position:relative;
width:180px;
height:50px;
margin:5px 5%;
padding:10px 0px;
border-radius:10px;
background-color: #fafafa;
box-shadow:1px 2px 2px grey,-1px 2px 2px grey,1px -2px 2px grey,-1px -2px 2px grey;
transition:all 225ms;
@media (min-width:800px){
  margin:5px 1%;
  width:98%;        
}
`;

export const DivDriverElementSecundaryS=styled.div`
display:flex;
flex-direction: row ;
text-align:center;
align-items: center;
${(props) =>
  props.padding &&
  css`
    padding-left:5%; 
  `}
  
@media (max-width:960px){
  flex-direction: row;       
}
@media (min-width:1844px){
  flex-direction: row;       
}`;

export const DivDriverElementTheeryS=styled.div`
justify-content: space-evenly;
width:50%;
margin-right: 10px;
display:flex;
flex-direction: row;`;



export const FormS=styled.form`
display:${(props) => (props.Show ? "flex" : "none")};
flex-direction:column;
justify-content:space-around;
align-items: center;
width: 100%;`;



export const LabelH4S=styled.h4`
margin-top:10px;
`;

export const OnlineSignal=styled.span`
border:solid 2px #757575;
border-radius:100px;
width:18px;
height:18px;
background-color:${(props) => (props.Online ? props.Color : 'black')};
margin-left:5px;
margin-right:2px;`;

export const H3S=styled.h3`
margin-left:3px; 
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