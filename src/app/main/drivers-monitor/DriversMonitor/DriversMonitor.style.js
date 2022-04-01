import styled,{css} from "styled-components";


export const FirstDiv=styled.div`
display:flex;
position:absolute;
width:100%;
height:100%;
justify-content:center;
flex-direction:column;
@media (min-width:1460px){
  flex-direction:row;       
}
`;


export const DivMap = styled.div`  
  display:flex;
  position:relative;
  width:100%;
  padding:0;
  height:250%;
  box-sizing: border-box;
  height:500%; 
  @media screen and (min-width:1460px){
    max-width: 85%;
    height:100%;
  }
`;

export const DivMarker=styled.div`
color:${(props) => (props.color ? props.color: "black")};
${(props) =>
  !props.Enable &&
  css`
    display:none; 
  `}`;

const eee="flex relative w-full p-0 h-full grow-0 shrink-0 basis-3/4 box-border"