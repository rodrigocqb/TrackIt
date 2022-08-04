import styled from "styled-components";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <FooterWrapper>
            <Link to="/habitos">Hábitos</Link>
            <Container>
                <CircularProgressbar
                    value={66}
                    text="Hoje"
                    background={true}
                    backgroundPadding={6}
                    styles={buildStyles({
                        backgroundColor: "#52B6FF",
                        textColor: "#FFFFFF",
                        pathColor: "#FFFFFF",
                        trailColor: "transparent",
                    })}
                />
            </Container>
            <Link to="/historico">Histórico</Link>
        </FooterWrapper>
    );
}

const FooterWrapper = styled.footer`
  width: 100vw;
  height: 70px;
  background-color: #FFFFFF;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 31px 0 36px;
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 2;

    a {
        color: #52B6FF;
        font-size: 18px;
    }
`;

const Container = styled.div`
    width: 91px;
    height: 91px;
    position: absolute;
    bottom: 15px;
    left: calc((100vw - 91px)/2);
`;