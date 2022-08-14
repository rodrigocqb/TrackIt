import styled, { keyframes } from "styled-components";

export default function Sidebar({ toggleSidebar, setToggleSidebar }) {
    return (
        <Menu show={toggleSidebar.show}>
            <Background
                onClick={() => {
                        setToggleSidebar({ ...toggleSidebar, slideOut: true });
                        setTimeout(() => {setToggleSidebar({ show: false, slideOut: false })}, 500);
                }}
            ></Background>
            <Content animation={toggleSidebar.slideOut}></Content>
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
  min-width: 40%;
  min-height: 100%;
  background-color: #ffffff;
  position: absolute;
  top: 0;
  right: 0;
  z-index: 4;
  animation: ${(props) => (props.animation ? SlideOut : SlideIn)} 0.5s
    ease-in-out;
`;
