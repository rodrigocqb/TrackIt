import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoginContext from "../contexts/LoginContext";
import UserContext from "../contexts/UserContext";

function useLocal() {
  const { setToken } = useContext(LoginContext);
  const { setUser } = useContext(UserContext);

  const navigate = useNavigate();

  useEffect(() => {
    const localUser = JSON.parse(localStorage.getItem("user"));
    if (localUser) {
      setUser(localUser);
      setToken(localUser.token);
      navigate("/hoje");
    }
  }, [navigate, setToken, setUser]);
}

export { useLocal };
