import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoginContext from "../contexts/LoginContext";

export default function PrivatePage({ children }) {
    const { token } = useContext(LoginContext);
    const navigate = useNavigate();
    
    useEffect(() => {
        if(!token) {
            alert("Por favor, faça login antes de acessar essa página");
            return navigate("/");
        }
    })

    if (!token) {
        return <></>;
    }

    return (
        <>{children}</>
    );
}