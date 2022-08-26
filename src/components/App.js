import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LanguageContext from "../contexts/LanguageContext";
import LoginContext from "../contexts/LoginContext";
import ProgressContext from "../contexts/ProgressContext";
import UserContext from "../contexts/UserContext";
import GlobalStyle from "../style/globalStyle";
import Habits from "./Habits/Habits";
import HistoricalData from "./HistoricalData/HistoricalData";
import Login from "./Login";
import PrivatePage from "./PrivatePage";
import SignUp from "./SignUp";
import Today from "./Today/Today";

function App() {
  const [token, setToken] = useState("");
  const [user, setUser] = useState(null);
  const [progress, setProgress] = useState(0);
  const [todayDone, setTodayDone] = useState({
    doneIds: [],
    numberDone: 0,
    numberTotal: 0,
  });
  const [language, setLanguage] = useState("pt-BR");

  return (
    <BrowserRouter>
      <LanguageContext.Provider value={{ language, setLanguage }}>
        <LoginContext.Provider value={{ token, setToken }}>
          <UserContext.Provider value={{ user, setUser }}>
            <ProgressContext.Provider
              value={{ progress, setProgress, todayDone, setTodayDone }}
            >
              <GlobalStyle />
              <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/cadastro" element={<SignUp />} />
                <Route
                  path="/habitos"
                  element={
                    <PrivatePage>
                      <Habits />
                    </PrivatePage>
                  }
                />
                <Route
                  path="/hoje"
                  element={
                    <PrivatePage>
                      <Today />
                    </PrivatePage>
                  }
                />
                <Route
                  path="/historico"
                  element={
                    <PrivatePage>
                      <HistoricalData />
                    </PrivatePage>
                  }
                />
              </Routes>
            </ProgressContext.Provider>
          </UserContext.Provider>
        </LoginContext.Provider>
      </LanguageContext.Provider>
    </BrowserRouter>
  );
}

export default App;
