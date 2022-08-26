import { useContext, useEffect, useState } from "react";
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
import "bootstrap-icons/font/bootstrap-icons.css";
import LanguageContext from "../contexts/LanguageContext";
import { useTranslation } from "react-i18next";

export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [disabled, setDisabled] = useState(false);
  const [showPW, setShowPW] = useState(false);

  useLocal();

  const { setToken } = useContext(LoginContext);
  const { setUser } = useContext(UserContext);
  const { language, setLanguage } = useContext(LanguageContext);

  const navigate = useNavigate();

  const { t, i18n } = useTranslation();

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

  function togglePassword() {
    setShowPW(!showPW);
  }

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language]);

  return (
    <main>
      <MainLogo src={Logo} alt="" />
      <LangSelect>
        <label htmlFor="language">{t("language")}</label>
        <select
          name="language"
          value={language}
          onChange={(e) => {
            setLanguage(e.target.value);
          }}
        >
          <option value="pt-BR">🇧🇷 Português</option>
          <option value="en">🇺🇸 English</option>
        </select>
      </LangSelect>
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
        <PasswordWrapper>
          <Input
            type={showPW ? "text" : "password"}
            placeholder={t("password")}
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
          <i
            className={showPW ? "bi bi-eye-slash-fill" : "bi bi-eye-fill"}
            onClick={togglePassword}
          ></i>
        </PasswordWrapper>
        <Button type="submit" disabled={disabled}>
          {disabled ? (
            <ThreeDots
              height="13"
              width="51"
              color="#FFFFFF"
              ariaLabel="three-dots-loading"
            />
          ) : (
            <p>{t("enter")}</p>
          )}
        </Button>
      </FormWrapper>
      <Link to="/cadastro">
        <SignUpLogin>{t("sign-up")}</SignUpLogin>
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

const PasswordWrapper = styled.div`
  width: 100%;
  height: 45px;
  position: relative;
  display: flex;
  align-items: center;

  i {
    position: absolute;
    right: 10px;
    font-size: 30px;
    color: #666666;
  }
`;

const LangSelect = styled.div`
  width: 160px;
  position: absolute;
  top: 10px;
  left: 10px;

  select {
    outline: none;
    color: #666666;
    border: 1px solid #d5d5d5;
    background-color: #ffffff;
    border-radius: 5px;
    margin-top: 5px;
    width: 70%;
    height: 30px;
    padding-left: 5px;
    font-size: 14px;
  }
`;
