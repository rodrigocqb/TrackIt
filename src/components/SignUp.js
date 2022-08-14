import { FormWrapper, MainLogo, MainNotAuth, SignUpLogin } from "./Login";
import Logo from "../img/logo.svg";
import { Link, useNavigate } from "react-router-dom";
import { postSignUp } from "../services/trackit.js";
import { useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import { Input } from "../common/Input";
import { Button } from "../common/Button";

export default function SignUp() {
  const [form, setForm] = useState({
    email: "",
    name: "",
    image: "",
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
    postSignUp(form)
      .then(() => {
        navigate("/");
      })
      .catch(() => {
        alert("Houve um erro no seu cadastro.");
        setDisabled(false);
      });
  }

  return (
    <MainNotAuth>
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
        <Input
          type="text"
          placeholder="nome"
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
          placeholder="foto"
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
            <p>Cadastrar</p>
          )}
        </Button>
      </FormWrapper>
      <Link to="/">
        <SignUpLogin>Já tem uma conta? Faça login!</SignUpLogin>
      </Link>
    </MainNotAuth>
  );
}
