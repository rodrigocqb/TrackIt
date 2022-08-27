import styled from "styled-components";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import ProgressContext from "../contexts/ProgressContext";
import { useTranslation } from "react-i18next";

export default function Footer() {
  const { progress } = useContext(ProgressContext);

  const { t } = useTranslation();

  return (
    <FooterWrapper>
      <Link to="/habits">{t("habits")}</Link>
      <Container>
        <Link to="/today">
          <CircularProgressbar
            value={progress}
            text={t("today")}
            background={true}
            backgroundPadding={6}
            styles={buildStyles({
              backgroundColor: "#52B6FF",
              textColor: "#FFFFFF",
              pathColor: "#FFFFFF",
              trailColor: "transparent",
            })}
          />
        </Link>
      </Container>
      <Link to="/history">{t("history")}</Link>
    </FooterWrapper>
  );
}

const FooterWrapper = styled.footer`
  width: 100vw;
  height: 70px;
  background-color: #ffffff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 31px 0 36px;
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 2;

  a {
    color: #52b6ff;
    font-size: 18px;
  }
`;

const Container = styled.div`
  width: 91px;
  height: 91px;
  position: absolute;
  bottom: 15px;
  left: calc((100vw - 91px) / 2);
`;
