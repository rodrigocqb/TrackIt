import styled from "styled-components";
import "bootstrap-icons/font/bootstrap-icons.css";
import { postCheck, postUncheck } from "../../services/trackit";
import { useContext, useState } from "react";
import LoginContext from "../../contexts/LoginContext";
import { Grid } from "react-loader-spinner";
import { useTranslation } from "react-i18next";

export default function TodayHabit({
  id,
  name,
  done,
  currentSequence,
  highestSequence,
  loadSwitch,
  setLoadSwitch,
}) {
  const [checkLoader, setCheckLoader] = useState(false);

  const { token } = useContext(LoginContext);

  const { t } = useTranslation();

  function checkHabit() {
    setCheckLoader(true);
    if (done) {
      postUncheck(id, token)
        .then(() => {
          setCheckLoader(false);
          setLoadSwitch(!loadSwitch);
        })
        .catch(() => {
          alert(t("errorUncheck"));
          setCheckLoader(false);
        });
    } else {
      postCheck(id, token)
        .then(() => {
          setCheckLoader(false);
          setLoadSwitch(!loadSwitch);
        })
        .catch(() => {
          alert(t("errorCheck"));
          setCheckLoader(false);
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
              <span>{t("sequence")}</span>
              <SequenceSpan done={done}>{`${currentSequence} ${t(
                "day"
              )}s`}</SequenceSpan>
            </span>
          ) : (
            <span>
              <span>{t("sequence")}</span>
              <SequenceSpan done={done}>{`${currentSequence} ${t(
                "day"
              )}`}</SequenceSpan>
            </span>
          )}
          <span>
            {highestSequence > 1 ? (
              <span>
                <span>{t("record")}</span>
                <RecordSpan
                  currentSequence={currentSequence}
                  highestSequence={highestSequence}
                  done={done}
                >{`${highestSequence} ${t("day")}s`}</RecordSpan>
              </span>
            ) : (
              <span>
                <span>{t("record")}</span>
                <RecordSpan
                  currentSequence={currentSequence}
                  highestSequence={highestSequence}
                  done={done}
                >{`${highestSequence} ${t("day")}`}</RecordSpan>
              </span>
            )}
          </span>
        </div>
      </div>
      <IconContainer done={done} onClick={checkHabit} disabled={checkLoader}>
        {!checkLoader ? (
          <i className="bi bi-check"></i>
        ) : (
          <LoaderContainer>
            <Grid
              height="50"
              width="50"
              color="#FFFFFF"
              ariaLabel="three-dots-loading"
            />
          </LoaderContainer>
        )}
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
    color: #ffffff;
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

export const IconContainer = styled.button`
  width: 69px;
  height: 69px;
  background-color: ${(props) => (props.done ? "#8FC549" : "#EBEBEB")};
  border-radius: 5px;
  border: 1px solid ${(props) => (props.done ? "#8FC549" : "#E7E7E7")};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoaderContainer = styled.section`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
