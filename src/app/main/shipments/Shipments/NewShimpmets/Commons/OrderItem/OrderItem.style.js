import styled from "styled-components";

export const OrderItemS = styled.div`
  width: 100%;
  padding: 12px 20px;
  border-radius: ${(props) => (props.last ? " 4px 4px 0 0" : "")};
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid rgba(0, 0, 0, 0.125);
  border-top: 0;
`;
export const TextS = styled.p`
  margin-bottom: 15px;
`;

export const ButtonsSectionS = styled.div`
  padding: 0 8px;
  display: flex;
`;
export const ButtonS = styled.div`
  padding: 8px 10px;
  background-color: #343a40;
  border-radius: 4px;
  color: white;
  cursor: pointer;
  margin: 0 5px;
  font-size: 16px;
  :hover {
    background-color: #1d2124;
  }
`;
