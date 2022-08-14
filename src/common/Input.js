import styled from "styled-components";

export const Input = styled.input`
  width: 100%;
  height: 45px;
  padding-left: 11px;
  background-color: ${(props) => (props.disabled ? "#F2F2F2" : "#FFFFFF")};
  border: 1px solid #d5d5d5;
  border-radius: 5px;
  font-size: 20px;
  color: ${(props) => (props.disabled ? "#AFAFAF" : "#666666")};
  outline: none;

  &::placeholder {
    color: #dbdbdb;
    opacity: 1;
  }
`;
