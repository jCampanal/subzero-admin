import styled from "styled-components";


const devices = {
    mobileS: `(min-width: '320px')`,
    mobileM: `(min-width: '375px')`,
    mobileL: `(min-width: '425px')`,
    tablet: `(min-width: '768px')`,
    laptop: `(min-width: '1024px')`,
    laptopL: `(min-width:'1440px')`,
    desktop: `(min-width:'2560px')`,
  };

const choferes="flex relative overflow-auto h-full grow-0 shrink-0 basis-1/4 w-full px-15 box-border max-w-[25%]";

export const BarDriversPrincipalS = styled.div`
  position:relative;
  display:flex;
  flex-direction:column;
  overflow:auto;
  height:250%;
  width: 100%;
  box-sizing: border-box;
  background-color:#fafafa;
  @media (min-width:960px){
    max-width: 15%;
    height:100%;        
  }
`;


export const BarDriversSecndari1S = styled.div`
  top: 15%;
  width: 100%;
  min-height:85%;
  overflow-y:auto;
  position:static;
  display: flex;
  flex-direction:column;
`;

export const ButtonS = styled.div`
  padding: 6px 12px;
  background-color: ${(props) =>
    props.selected ? (props.left ? "#17a2b8;" : "#6c757d") : "white"};
  color: ${(props) =>
    props.selected ? "white" : props.left ? "#17a2b8;" : "#6c757d"};
  font-size: 16px;
  border: 1px solid #17a2b8;
  cursor: pointer;
  border-radius: ${(props) => (props.left ? "4px 0 0 4px" : "0 4px 4px 0")};
  :hover {
    background-color: ${(props) => (props.left ? "#17a2b8;" : "#6c757d")};
    color: white;
  }
`;

export const LabelS=styled.div`
  display:inline-flex;
  padding-left:10%;
  width:100%; 
  color:black;
  @media (min-width:960px){
    left:1%;        
  }`;
