import styled, { css } from "styled-components";
export const ProductFormS = styled.div``;

export const ButtonWrapperS = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const ButtonS = styled.button`
  padding: 6px 12px;
  background-color: ${(props) => (props.orderRepeted ? "#28a745" : "#138496")};
  color: white;
  font-size: 16px;
  border: 1px solid ${(props) => (props.orderRepeted ? "#28a745" : "#117a8b")};
  cursor: pointer;
  border-radius: 4px;
  width: fit-content;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  :hover {
    background-color: #117a8b;
    border-color: #117a8b;
  }

  ${(props) =>
    props.danger &&
    css`
      background-color: #dc3545;
      border-color: #dc3545;
      :hover {
        background-color: #c82333;
        border-color: #bd2130;
      }
    `}
  ${(props) =>
    props.primary &&
    css`
      background-color: #007bff;
      border-color: #007bff;
      :hover {
        background-color: #0069d9;
        border-color: #0062cc;
      }
    `}
`;

export const OrderTitleS = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;
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
export const OrderS = styled.div`
  padding: 12px 20px;
  border: 1px solid rgba(0, 0, 0, 0.125);
  ${(props) =>
    props.first &&
    css`
      border-radius: 4px 4px 0 0;
    `}
  ${(props) =>
    props.last &&
    css`
      border-radius: 0 0 4px 4px;
    `}
  ${(props) =>
    props.unique &&
    css`
      border-radius: 4px;
    `}
`;
export const OrderCotentS = styled.div`
  display: flex;
  justify-content: space-between;
`;
export const OrderNameS = styled.h4`
  font-size: 16px;
`;
export const OrderDetailsS = styled.h4`
  display: flex;
  align-items: center;
`;
export const IconS = styled.div`
  color: #dc3545;
  border: 1px solid #dc3545;
  margin-left: 5px;
  border-radius: 4px;
  cursor: pointer;
  :hover {
    background-color: #dc3545;
    color: white;
  }
`;
export const OrderDescriptionS = styled.div`
  color: #6c757d;
  font-size: 12px;
`;
export const OrderFooterS = styled.div`
  margin-top: 20px;
`;
