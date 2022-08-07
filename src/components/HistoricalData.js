import dayjs from "dayjs";
import { useContext, useEffect, useRef, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { MainAuth } from "../common/MainAuth";
import { TitleSection } from "../common/TitleSection";
import LoginContext from "../contexts/LoginContext";
import { getHistory } from "../services/trackit";
import Footer from "./Footer";
import Header from "./Header";
import PastHabit from "./PastHabit";

export default function HistoricalData() {
  const [data, setData] = useState([]);
  const [days, setDays] = useState([]);
  const [openDay, setOpenDay] = useState({
    open: false,
    habits: [],
    day: "",
  });

  const { token } = useContext(LoginContext);

  const navigate = useNavigate();

  const scroll = useRef(null);

  const week = [
    "Domingo",
    "Segunda",
    "Terça",
    "Quarta",
    "Quinta",
    "Sexta",
    "Sábado",
  ];

  useEffect(() => {
    getHistory(token)
      .then((res) => {
        setData(res.data);
        setDays(res.data.map((v) => v.day));
      })
      .catch(() => {
        alert("Houve um erro ao carregar o histórico");
      });
  }, [token]);

  function assignColor({ date }) {
    const tileDate = dayjs(date).format("DD/MM/YYYY");
    const today = dayjs().format("DD/MM/YYYY");

    if (tileDate !== today && data.some((v) => v.day === tileDate)) {
      if (data[days.indexOf(tileDate)].habits.some((v) => v.done === false)) {
        return "incomplete";
      } else {
        return "complete";
      }
    }
  }

  function showHabits(value) {
    const tileDate = dayjs(value).format("DD/MM/YYYY");
    const today = dayjs().format("DD/MM/YYYY");
    if (tileDate === today) {
      navigate("/");
    } else if (data.some((v) => v.day === tileDate)) {
      setOpenDay({
        open: true,
        habits: [...data[days.indexOf(tileDate)].habits],
        day: data[days.indexOf(tileDate)].day,
      });
      setTimeout(() => {
        scroll.current.scrollIntoView({ behavior: "smooth" });
      }, 300);
    } else {
      return alert("Não haviam hábitos para este dia");
    }
  }

  return (
    <>
      <MainAuth>
        <Header />
        <TitleSection>
          <h1>Histórico</h1>
        </TitleSection>
        <CalendarContainer>
          <Calendar
            locale="pt-br"
            calendarType="US"
            className="calendar"
            formatDay={(locale, date) => dayjs(date).format("DD")}
            tileClassName={assignColor}
            onClickDay={showHabits}
          />
        </CalendarContainer>
        {openDay.open && (
          <DaySection ref={scroll}>
            <TitleSection>
              <h1>{`${week[openDay.habits[0].weekDay]}, ${openDay.day}`}</h1>
            </TitleSection>
            {openDay.habits.map((value) => (
              <PastHabit key={value.id} name={value.name} done={value.done} />
            ))}
          </DaySection>
        )}
        <Footer />
      </MainAuth>
    </>
  );
}

const CalendarContainer = styled.section`
  margin-top: 12px;

  .calendar {
    border: 0px;
    border-radius: 10px;
    width: 100%;
    height: 402px;
    max-width: 550px;
  }

  .calendar button {
    margin: 3px 0;
  }

  .react-calendar__tile {
    padding: 20px 6.6667px;
  }

  .complete,
  .incomplete {
    clip-path: circle(35%);
  }

  .complete {
    background-color: #8cc654;
  }

  .incomplete {
    background-color: #ea5766;
  }
`;

const DaySection = styled.section`
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  margin-bottom: 40px;
`;
