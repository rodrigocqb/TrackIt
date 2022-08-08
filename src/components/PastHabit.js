import styled from "styled-components";
import "bootstrap-icons/font/bootstrap-icons.css";
import { IconContainer } from "./TodayHabit";

export default function PastHabit({ name, done, }) {
    return (
        <Wrapper>
            <div>
                <h2>{name}</h2>
            </div>
            <IconContainer done={done}>
              <i className="bi bi-check"></i>
            </IconContainer>
        </Wrapper>
    );
}

const Wrapper = styled.div`
  width: 100%;
  height: 94px;
  background-color: #ffffff;
  border-radius: 5px;
  color: #666666;
  padding: 13px 13px 12px 15px;
  display: flex;
  justify-content: space-between;

  h2 {
    padding-top: 2px;
    font-size: 20px;
  }

  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  i {
    font-size: 69px;
    color: #FFFFFF;
  }
`;