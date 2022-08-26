import {
  FormWrapper,
  LangSelect,
  MainLogo,
  MainNotAuth,
  SignUpLogin,
} from "./Login";
import Logo from "../img/logo.svg";
import { Link, useNavigate } from "react-router-dom";
import { postSignUp } from "../services/trackit.js";
import { useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import { Input } from "../common/Input";
import { Button } from "../common/Button";
import { useTranslation } from "react-i18next";

export default function SignUp() {
  const [form, setForm] = useState({
    email: "",
    name: "",
    image: "",
    password: "",
  });

  const [disabled, setDisabled] = useState(false);

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
    postSignUp(form)
      .then(() => {
        navigate("/");
      })
      .catch(() => {
        alert(t("errorSignUp"));
        setDisabled(false);
      });
  }

  return (
    <MainNotAuth>
      <MainLogo src={Logo} alt="" />
      <LangSelect>
        <label htmlFor="language">{t("language")}</label>
        <select
          name="language"
          value={i18n.resolvedLanguage}
          onChange={(e) => {
            i18n.changeLanguage(e.target.value);
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
        <Input
          type="password"
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
        <Input
          type="text"
          placeholder={t("name")}
          name="name"
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
          type="url"
          placeholder={t("photo")}
          name="image"
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
            <p>{t("sign-up")}</p>
          )}
        </Button>
      </FormWrapper>
      <Link to="/">
        <SignUpLogin>{t("login")}</SignUpLogin>
      </Link>
    </MainNotAuth>
  );
}
