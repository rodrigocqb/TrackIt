import { Link } from "react-router-dom";
import styled from "styled-components";
import Logo from "../img/logo.svg";

export default function Login() {
    return (
        <main>
            <MainLogo src={Logo} alt="" />
            <InputContainer>
                <input type="email" placeholder="email" required></input>
                <input type="password" placeholder="senha" required></input>
                <button>Entrar</button>
            </InputContainer>
            <Link to="/cadastro">
                <SignUpLogin>Não tem uma conta? Cadastre-se!</SignUpLogin>
            </Link>
        </main>
    );
}

export const MainNotAuth = styled.main`
    background-color: #FFFFFF;
`;

export const MainLogo = styled.img`
    width: 180px;
    height: 178.38px;
    margin-top: 68px;
    margin-bottom: 32.62px;
`;

export const SignUpLogin = styled.span`
    color: #52B6FF;
    font-size: 14px;
    text-decoration: underline;
`;

export const InputContainer = styled.form`
    width: 303px;
    display: flex;
    flex-direction: column;
    row-gap: 6px;
    margin-bottom: 25px;

    input {
        width: 100%;
        height: 45px;
        padding-left: 11px;
        background: #FFFFFF;
        border: 1px solid #D5D5D5;
        border-radius: 5px;
        font-size: 20px;
        color: #666666;
        outline: none;
    }
    input::placeholder {
        color: #DBDBDB;
        opacity: 1;
    }

    button {
        width: 100%;
        height: 45px;
        background-color: #52B6FF;
        border: 0px;
        border-radius: 4.64px;
        color: #FFFFFF;
        font-size: 21px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
`;