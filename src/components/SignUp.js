import { InputContainer, MainLogo, MainNotAuth, SignUpLogin } from "./Login";
import Logo from "../img/logo.svg";
import { Link, useNavigate } from "react-router-dom";
import { postSignUp } from "../services/trackit.js";
import { useState } from "react";

export default function SignUp() {
    const [form, setForm] = useState({
        email: "",
        name: "",
        image: "",
        password: "",
    });

    const navigate = useNavigate();

    function handleForm({ value, name }) {
        setForm({
            ...form,
            [name]: value,
        });
    }

    function handleSubmit(e) {
        e.preventDefault();
        console.log(form)
        postSignUp(form).then(() => {
            navigate("/");
        }).catch((res) => {
            console.log("An error has occurred");
            console.log(res.data);
        });
    }

    return (
        <MainNotAuth>
            <MainLogo src={Logo} alt="" />
            <InputContainer onSubmit={handleSubmit}>
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
                    required
                ></input>
                <input
                    type="text"
                    placeholder="nome"
                    name="name"
                    onChange={(e) =>
                        handleForm({
                            name: e.target.name,
                            value: e.target.value,
                        })
                    }
                    required
                ></input>
                <input
                    type="url"
                    placeholder="foto"
                    name="image"
                    onChange={(e) =>
                        handleForm({
                            name: e.target.name,
                            value: e.target.value,
                        })
                    }
                    required
                ></input>
                <button type="submit">Entrar</button>
            </InputContainer>
            <Link to="/">
                <SignUpLogin>Já tem uma conta? Faça login!</SignUpLogin>
            </Link>
        </MainNotAuth>
    );
}
