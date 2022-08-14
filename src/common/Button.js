import styled from "styled-components";

export const Button = styled.button`
  width: 100%;
  height: 45px;
  background-color: #52b6ff;
  border: 0px;
  border-radius: 4.64px;
  color: #ffffff;
  font-size: 21px;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: ${(props) => (props.disabled ? 0.7 : 1)};
`;
