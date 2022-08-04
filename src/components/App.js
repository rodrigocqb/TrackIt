import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginContext from "../context/LoginContext";
import UserContext from "../context/UserContext";
import GlobalStyle from "../style/globalStyle";
import Habits from "./Habits";
import History from "./History";
import Login from "./Login";
import SignUp from "./SignUp";
import Today from "./Today";

function App() {
  const [token, setToken] = useState("");
  const [user, setUser] = useState(null);

  return (
    <BrowserRouter>
      <LoginContext.Provider value={{ token, setToken }}>
        <UserContext.Provider value={{ user, setUser }}>
          <GlobalStyle />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/cadastro" element={<SignUp />} />
            <Route path="/habitos" element={<Habits />} />
            <Route path="/hoje" element={<Today />} />
            <Route path="/historico" element={<History />} />
          </Routes>
        </UserContext.Provider>
      </LoginContext.Provider>
    </BrowserRouter>
  );
}

export default App;
