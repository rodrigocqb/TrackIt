import { useState } from "react";
import { useContext } from "react";
import styled from "styled-components";
import UserContext from "../contexts/UserContext";
import Sidebar from "./Sidebar";

export default function Header() {
    const [toggleSidebar, setToggleSidebar] = useState({show: false, slideOut: false});

    const { user } = useContext(UserContext);

    return (
        <>
            <HeaderWrapper>
                <h1>TrackIt</h1>
                <img src={user.image} alt="" onClick={() => {setToggleSidebar({ ...toggleSidebar, show: true });}} />
            </HeaderWrapper>
            <Sidebar toggleSidebar={toggleSidebar} setToggleSidebar={setToggleSidebar} />
        </>
    );
}

const HeaderWrapper = styled.header`
    width: 100vw;
    height: 70px;
    background-color: #126BA5;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
    font-family: 'Playball', cursive;
    font-size: 39px;
    color: #FFFFFF;
    padding: 0 10px 0 18px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 2;

    img {
        width: 51px;
        height: 51px;
        border-radius: 50%;
    }
`;