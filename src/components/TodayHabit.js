import styled from "styled-components";
import "bootstrap-icons/font/bootstrap-icons.css";

export default function TodayHabit({
    id,
    name,
    done,
    currentSequence,
    highestSequence,
}) {
    return (
        <Wrapper done={done}>
            <div>
                <h2>{name}</h2>
                <div>
                    <span>
                        {currentSequence > 1
                            ? `Sequência atual: ${currentSequence} dias`
                            : `Sequência atual: ${currentSequence} dia`}
                    </span>
                    <span>
                        {highestSequence > 1
                            ? `Seu recorde: ${highestSequence} dias`
                            : `Seu recorde: ${highestSequence} dia`}
                    </span>
                </div>
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

  span {
    font-size: 13px;
  }

  div {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  div > div {
    row-gap: 2px;
    margin-bottom: 5px;
  }

  i {
    font-size: 69px;
    color: ${props => props.done ? "#8FC549" : "#E7E7E7"};
  }
`;
