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



export const BarDriversPrincipalS = styled.div`
  position:absolute;
 
  width: 300px ;
  right: ${(props) =>
    props.Selected?"0":"-300px"};
  display:block;
  top: 0;  
  transition: right 400ms, display 1s;
  align-items: center;
  justify-content: center;
  height: 100%;
  z-index:999;
  font-family: Poppins,Roboto,Helvetica,Arial,sans-serif;
  &::-webkit-scrollbar-thumb {
    background-color: #797979;
    border-radius: 20px;
    border: 2px solid #f1f2f3;
}
  &@media(max-width: ${devices.mobileL}) {
    right: ${(props) => 
        props.Selected?"50%":"-50%"};
    width: "50%" ;

  }
`;
export const BarDriversSecndari2S = styled.div`  
  background-color: #fafafa;
  width: 100%;
  height:15%;
  position:fixed;
  z-index:1000;
  background-color:#3f51b5;
  display:flex;
  align-items:center
 
`;

export const BarDriversSecndari1S = styled.div`
  top: 15%;
  background-color: #fafafa;
  width: 100%;
  min-height:85%;
  position:relative;
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