import styled from "styled-components";

export default function TodayHabit({
    id,
    name,
    done,
    currentSequence,
    highestSequence,
}) {
    return (
        <Wrapper>
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
        </Wrapper>
    );
}

const Wrapper = styled.div`
  width: 100%;
  height: 94px;
  background-color: #ffffff;
  border-radius: 5px;
  color: #666666;
  padding: 14px 13px 17px 15px;
  display: flex;

  h2 {
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
  }
`;
