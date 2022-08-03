import { BrowserRouter, Route, Routes } from "react-router-dom";
import GlobalStyle from "../style/globalStyle";
import Habits from "./Habits";
import History from "./History";
import Login from "./Login";
import SignUp from "./SignUp";
import Today from "./Today";

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/cadastro" element={<SignUp />} />
        <Route path="/habitos" element={<Habits />} />
        <Route path="/hoje" element={<Today />} />
        <Route path="/historico" element={<History />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
