import { useContext } from "react";
import styled from "styled-components";
import UserContext from "../context/UserContext";

export default function Header() {
    const { user } = useContext(UserContext);
    return (
        <HeaderWrapper>
            <h1>TrackIt</h1>
            <img src={user.image} alt="" />
        </HeaderWrapper>
    );
}

const HeaderWrapper = styled.header`
    width: 375px;
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
    left: 0;
    top: 0;
    z-index: 2;

    img {
        width: 51px;
        height: 51px;
        border-radius: 50%;
    }
`;