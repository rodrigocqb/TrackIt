import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Logo from "../img/logo.svg";
import { ThreeDots } from "react-loader-spinner";
import { postLogin } from "../services/trackit";

export default function Login() {
    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const [disabled, setDisabled] = useState(false);

    const navigate = useNavigate();

    function handleForm({ value, name }) {
        setForm({
            ...form,
            [name]: value,
        });
    }

    function handleSubmit(e) {
        e.preventDefault();
        setDisabled(true);
        postLogin(form)
            .then(() => {
                navigate("/hoje");
            })
            .catch(() => {
                alert("Houve um erro no seu login.");
                setDisabled(false);
            });
    }

    return (
        <main>
            <MainLogo src={Logo} alt="" />
            <InputContainer onSubmit={handleSubmit} disabled={disabled}>
            <input
                    type="email"
                    placeholder="email"
                    name="email"
                    onChange={(e) =>
                        handleForm({
                            name: e.target.name,
                            value: e.target.value,
                        })
                    }
                    disabled={disabled}
                    required
                ></input>
                <input
                    type="password"
                    placeholder="senha"
                    name="password"
                    onChange={(e) =>
                        handleForm({
                            name: e.target.name,
                            value: e.target.value,
                        })
                    }
                    disabled={disabled}
                    required
                ></input>
                <button type="submit" disabled={disabled}>
                    {disabled ? (
                        <ThreeDots
                            height="13"
                            width="51"
                            color="#FFFFFF"
                            ariaLabel="three-dots-loading"
                        />
                    ) : (
                        <p>Entrar</p>
                    )}
                </button>
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
        background-color: ${(props) => props.disabled ? "#F2F2F2" : "#FFFFFF"};
        border: 1px solid #D5D5D5;
        border-radius: 5px;
        font-size: 20px;
        color: #666666;
        outline: none;
    }
    input::placeholder {
        color: ${(props) => props.disabled ? "#AFAFAF" : "#DBDBDB"};
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
        opacity: ${(props) => props.disabled ? 0.7 : 1};
    }
`;