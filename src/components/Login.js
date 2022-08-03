import { Link } from "react-router-dom";
import styled from "styled-components";
import Logo from "../img/logo.svg";

export default function Login() {
    return (
        <main>
            <MainLogo src={Logo} alt="" />
            <InputContainer>
                <input type="email" placeholder="email" ></input>
                <input type="password" placeholder="senha" ></input>
                <div>Entrar</div>
            </InputContainer>
            <Link to="/cadastro">
                <SignUpLink>Não tem uma conta? Cadastre-se</SignUpLink>
            </Link>
        </main>
    );
}

const MainLogo = styled.img`
    width: 180px;
    height: 178.38px;
    margin-top: 68px;
    margin-bottom: 32.62px;
`;

const SignUpLink = styled.span`
    color: #52B6FF;
    font-size: 14px;
    text-decoration: underline;
`;

const InputContainer = styled.div`
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
    }
    input::placeholder {
        color: #DBDBDB;
        opacity: 1;
    }

    div {
        width: 100%;
        height: 45px;
        background-color: #52B6FF;
        border-radius: 4.64px;
        color: #FFFFFF;
        font-size: 21px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
`;