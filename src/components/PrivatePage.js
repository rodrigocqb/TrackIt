import { useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import LoginContext from "../contexts/LoginContext";
import UserContext from "../contexts/UserContext";

export default function PrivatePage({ children }) {
  const { token, setToken } = useContext(LoginContext);
  const { setUser } = useContext(UserContext);

  const navigate = useNavigate();

  const { t } = useTranslation();

  const localUser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!localUser) {
      alert(t("pleaseLogIn"));
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
