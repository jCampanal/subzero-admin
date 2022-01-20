import styled from "styled-components";

export const HeaderS = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding-bottom: 16px;
`;

export const ButtonS = styled.div`
  padding: 6px 12px;
  background-color: ${(props) => (props.selected ? "#007bff" : "white")};
  color: ${(props) => (props.selected ? "white" : "#007bff")};
  font-size: 16px;
  border: 1px solid #007bff;
  cursor: pointer;
  border-radius: ${(props) => (props.left ? "4px 0 0 4px" : "0 4px 4px 0")};
`;
