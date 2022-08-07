import styled from "styled-components";
import "bootstrap-icons/font/bootstrap-icons.css";

export default function PastHabit({ name, done, }) {
    return (
        <Wrapper done={done}>
            <div>
                <h2>{name}</h2>
            </div>
            <div>
                <i className="bi bi-check-square-fill"></i>
            </div>
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
    color: ${(props) => (props.done ? "#8FC549" : "#E7E7E7")};
  }
`;