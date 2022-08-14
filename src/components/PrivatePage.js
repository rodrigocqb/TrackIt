import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoginContext from "../contexts/LoginContext";
import UserContext from "../contexts/UserContext";

export default function PrivatePage({ children }) {
  const { token, setToken } = useContext(LoginContext);
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const localUser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!localUser) {
      alert("Por favor, faça login antes de acessar essa página");
      return navigate("/");
    } else if (!token) {
      setToken(localUser.token);
      setUser(localUser);
    }
  }, [localUser, navigate, token, setToken, setUser]);

  if (!token) {
    return <></>;
  }

  return <>{children}</>;
}
