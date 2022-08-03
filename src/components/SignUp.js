import { InputContainer, MainLogo, MainNotAuth, SignUpLogin } from "./Login";
import Logo from "../img/logo.svg";
import { Link } from "react-router-dom";

export default function SignUp() {
    return (
        <MainNotAuth>
            <MainLogo src={Logo} alt="" />
            <InputContainer>
                <input type="email" placeholder="email" ></input>
                <input type="password" placeholder="senha" ></input>
                <input type="text" placeholder="nome" ></input>
                <input type="url" placeholder="foto" ></input>
                <div>Entrar</div>
            </InputContainer>
            <Link to="/">
                <SignUpLogin>Já tem uma conta? Faça login!</SignUpLogin>
            </Link>
        </MainNotAuth>
    );
}