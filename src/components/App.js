import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
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

  return (
    <BrowserRouter>
      <LoginContext.Provider value={{ token, setToken }}>
        <UserContext.Provider value={{ user, setUser }}>
          <ProgressContext.Provider
            value={{ progress, setProgress, todayDone, setTodayDone }}
          >
            <GlobalStyle />
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route
                path="/habits"
                element={
                  <PrivatePage>
                    <Habits />
                  </PrivatePage>
                }
              />
              <Route
                path="/today"
                element={
                  <PrivatePage>
                    <Today />
                  </PrivatePage>
                }
              />
              <Route
                path="/history"
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
