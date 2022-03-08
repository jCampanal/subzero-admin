import styled from "styled-components";

export const OptionsMenusDivS = styled.div`
  width: 80%;
  left:10%;
  display: flex;
  justify-content: center;
  margin-top:10px;
  padding-bottom: 8px;
  position: relative;
`;

export const ButtonS = styled.div`
  padding: 6px 0;
  background-color: ${(props) => (props.selected ? "#007bff" : "white")};
  color: ${(props) => (props.selected ? "white" : "#007bff")};
  font-size: 16px;
  border: 1px solid #007bff;
  cursor: pointer;
  border-radius: ${(props) => (props.left ? "4px 0 0 4px" : "0 4px 4px 0")};
  width: 50%;
  text-align: center;
`;