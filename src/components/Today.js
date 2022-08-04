import { useContext } from "react";
import styled from "styled-components";
import LoginContext from "../context/LoginContext";
import UserContext from "../context/UserContext";
import Header from "./Header";

export default function Today() {
    const { token } = useContext(LoginContext);
    const { user } = useContext(UserContext);
    console.log(token)
    console.log(user)
    return (
        <>
            <Header />
            <MainAuth>
                
            </MainAuth>
        </>
    );
}

const MainAuth = styled.main`
    background-color: #F2F2F2;
    min-height: 100vh;
    margin-top: 70px;
`;