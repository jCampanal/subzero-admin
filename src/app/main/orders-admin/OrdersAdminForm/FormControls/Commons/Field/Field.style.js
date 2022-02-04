import styled, { css } from "styled-components";

export const FieldS = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 7px;

  ${(props) =>
    props.hidden &&
    css`
      display: none;
    `}
`;
export const LabelS = styled.label`
  font-size: 16px;
  margin-bottom: 5px;

  span {
    color: #007bff;
    font-size: 80%;
  }
`;
