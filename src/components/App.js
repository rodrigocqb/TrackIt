import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginContext from "../contexts/LoginContext";
import ProgressContext from "../contexts/ProgressContext";
import UserContext from "../contexts/UserContext";
import GlobalStyle from "../style/globalStyle";
import Habits from "./Habits";
import HistoricalData from "./HistoricalData";
import Login from "./Login";
import PrivatePage from "./PrivatePage";
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
    </BrowserRouter>
  );
}

export default App;
