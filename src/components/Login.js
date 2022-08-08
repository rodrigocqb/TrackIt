import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Logo from "../img/logo.svg";
import { ThreeDots } from "react-loader-spinner";
import { postLogin } from "../services/trackit";
import LoginContext from "../contexts/LoginContext";
import UserContext from "../contexts/UserContext";
import { Input } from "../common/Input";
import { Button } from "../common/Button";
import { useLocal } from "../hooks/useLocal";

export default function Login() {
    const [form, setForm] = useState({
        email: "",
        password: "",
    });
    const [disabled, setDisabled] = useState(false);

    useLocal();
    
    const { setToken } = useContext(LoginContext);
    const { setUser } = useContext(UserContext);

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
            .then((res) => {
                setUser(res.data);
                localStorage.setItem("user", JSON.stringify(res.data));
                setToken(res.data.token);
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
            <FormWrapper onSubmit={handleSubmit}>
                <Input
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
                ></Input>
                <Input
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
                ></Input>
                <Button type="submit" disabled={disabled}>
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
                </Button>
            </FormWrapper>
            <Link to="/cadastro">
                <SignUpLogin>Não tem uma conta? Cadastre-se!</SignUpLogin>
            </Link>
        </main>
    );
}

export const MainNotAuth = styled.main`
  background-color: #ffffff;
  min-height: 100vh;
`;

export const MainLogo = styled.img`
  width: 180px;
  height: 178.38px;
  margin-top: 68px;
  margin-bottom: 32.62px;
`;

export const SignUpLogin = styled.span`
  color: #52b6ff;
  font-size: 14px;
  text-decoration: underline;
`;

export const FormWrapper = styled.form`
  width: 303px;
  display: flex;
  flex-direction: column;
  row-gap: 6px;
  margin-bottom: 25px;
`;
