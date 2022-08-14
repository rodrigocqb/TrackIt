import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import UserContext from "../contexts/UserContext";

export default function Sidebar({ toggleSidebar, setToggleSidebar }) {
    const { user } = useContext(UserContext);

    const navigate = useNavigate();

    return (
        <Menu show={toggleSidebar.show}>
            <Background
                onClick={() => {
                    setToggleSidebar({ ...toggleSidebar, slideOut: true });
                    setTimeout(() => { setToggleSidebar({ show: false, slideOut: false }) }, 500);
                }}
            ></Background>
            <Content animation={toggleSidebar.slideOut}>
                <div>
                    <img src={user.image} alt="" />
                    {user.name}
                </div>
                <Options>
                    <div>Theme toggle</div>
                    <div>Language</div>
                    <div onClick={() => {
                        if (window.confirm("Tem certeza que deseja fazer logout?")) {
                            localStorage.removeItem("user");
                            navigate("/");
                        }
                    }}>Logout</div>
                </Options>
            </Content>
        </Menu>
    );
}

const SlideIn = keyframes`
    0% {transform: translate(100%)}
    100% {transform: translate(0)}
`;

const SlideOut = keyframes`
    0% {transform: translate(0)}
    100% {transform: translate(100%)}
`;

const Menu = styled.section`
  min-height: 100vh;
  width: 100vw;
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 3;
  display: ${(props) => (props.show ? "initial" : "none")};
`;

const Background = styled.div`
  min-width: 100%;
  min-height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
`;

const Content = styled.div`
  width: 50%;
  min-height: 100%;
  background-color: #f2f2f2;
  padding: 0 10px;
  color: #126ba5;
  font-weight: 700;
  font-size: 18px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  top: 0;
  right: 0;
  z-index: 4;
  animation: ${(props) => (props.animation ? SlideOut : SlideIn)} 0.5s
    ease-in-out;

    img {
        min-width: 51px;
        height: 51px;
        border-radius: 50%;
        margin-right: 15px;
    }

    div:first-child {
        display: flex;
        align-items: center;
        word-break: break-word;
        margin-top: 20px;
    }
`;

const Options = styled.div`
    margin-top: 40px;

    div {
        margin-top: 20px;
    }
`;