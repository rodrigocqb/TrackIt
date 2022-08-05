import styled from "styled-components";
import "bootstrap-icons/font/bootstrap-icons.css";
import { postCheck, postUncheck } from "../services/trackit";
import { useContext } from "react";
import LoginContext from "../contexts/LoginContext";

export default function TodayHabit({
    id,
    name,
    done,
    currentSequence,
    highestSequence,
    loadSwitch,
    setLoadSwitch,
}) {
    const { token } = useContext(LoginContext);

    function checkHabit() {
        if (done) {
            postUncheck(id, token)
                .then(() => {
                    setLoadSwitch(!loadSwitch);
                })
                .catch(() => {
                    alert("Houve um erro ao desmarcar seu hábito");
                });
        } else {
            postCheck(id, token)
                .then(() => {
                    setLoadSwitch(!loadSwitch);
                })
                .catch(() => {
                    alert("Houve um erro ao marcar seu hábito");
                });
        }
    }

    return (
        <Wrapper done={done}>
            <div>
                <h2>{name}</h2>
                <div>
                    {currentSequence > 1 ? (
                        <span>
                            <span>Sequência atual: </span>
                            <SequenceSpan
                                done={done}
                            >{`${currentSequence} dias`}</SequenceSpan>
                        </span>
                    ) : (
                        <span>
                            <span>Sequência atual: </span>
                            <SequenceSpan
                                done={done}
                            >{`${currentSequence} dia`}</SequenceSpan>
                        </span>
                    )}
                    <span>
                        {highestSequence > 1 ? (
                            <span>
                                <span>Seu recorde: </span>
                                <RecordSpan
                                    currentSequence={currentSequence}
                                    highestSequence={highestSequence}
                                    done={done}
                                >{`${highestSequence} dias`}</RecordSpan>
                            </span>
                        ) : (
                            <span>
                                <span>Seu recorde: </span>
                                <RecordSpan
                                    currentSequence={currentSequence}
                                    highestSequence={highestSequence}
                                    done={done}
                                >{`${highestSequence} dia`}</RecordSpan>
                            </span>
                        )}
                    </span>
                </div>
            </div>
            <div onClick={checkHabit}>
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
    color: ${(props) => (props.done ? "#8FC549" : "#E7E7E7")};
  }
`;

const SequenceSpan = styled.span`
  color: ${(props) => (props.done ? "#8FC549" : "#666666")};
`;

const RecordSpan = styled.span`
  color: ${(props) => {
        if (props.done && props.currentSequence === props.highestSequence) {
            return "#8FC549";
        }
        return "#666666";
    }};
`;
