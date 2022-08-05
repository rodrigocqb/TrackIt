import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginContext from "../contexts/LoginContext";
import ProgressContext from "../contexts/ProgressContext";
import UserContext from "../contexts/UserContext";
import GlobalStyle from "../style/globalStyle";
import Habits from "./Habits";
import History from "./History";
import Login from "./Login";
import SignUp from "./SignUp";
import Today from "./Today";

function App() {
  const [token, setToken] = useState("");
  const [user, setUser] = useState(null);
  const [progress, setProgress] = useState(0);

  return (
    <BrowserRouter>
      <LoginContext.Provider value={{ token, setToken }}>
        <UserContext.Provider value={{ user, setUser }}>
          <ProgressContext.Provider value={{ progress, setProgress }}>
            <GlobalStyle />
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/cadastro" element={<SignUp />} />
              <Route path="/habitos" element={<Habits />} />
              <Route path="/hoje" element={<Today />} />
              <Route path="/historico" element={<History />} />
            </Routes>
          </ProgressContext.Provider>
        </UserContext.Provider>
      </LoginContext.Provider>
    </BrowserRouter>
  );
}

export default App;
