import styled, { css } from "styled-components";

export const TimeSectionS = styled.div`
  width: 100%;
  padding: 10px 0;
`;

export const LabelS = styled.div`
  font-size: 16px;
  margin-bottom: 10px;

  span {
    color: #6c757d;
    font-size: 80%;
  }
`;
export const WeeklyButtonS = styled.div`
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
`;
export const DayButtonsWrapperS = styled.div`
  padding: 15px 20px;
  text-align: center;
  display: flex;
  flex-direction: column;
`;
export const TextS = styled.div`
  font-size: 16px;
`;
export const DayButtonsS = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;
export const ButtonGroupWrapperS = styled.div`
  margin: 5px;
`;

export const ButtonS = styled.div`
  padding: 6px 12px;
  background-color: ${(props) => (props.selected ? "#007bff" : "white")};
  color: ${(props) => (props.selected ? "white" : "#007bff")};
  font-size: 16px;
  border: 1px solid #007bff;
  cursor: pointer;
  ${(props) =>
    props.radius === "right" &&
    css`
      border-radius: 0 4px 4px 0;
    `}
  ${(props) =>
    props.radius === "left" &&
    css`
      border-radius: 4px 0 0 4px;
    `}
  ${(props) =>
    props.radius === "both" &&
    css`
      border-radius: 4px;
    `}
`;
