import styled from "styled-components";

export const FormDateS = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 5px;
`;
export const ButtonGroupWrapperS = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
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
