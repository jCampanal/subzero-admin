import styled,{css} from "styled-components";

export const DivMap = styled.div`  
  display:flex;
  position:relative;
  width:100%;
  padding:0;
  height:250%;
  box-sizing: border-box;
  
  @media screen and (min-width:960px){
    max-width: 65%;
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