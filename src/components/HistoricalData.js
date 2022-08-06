import dayjs from "dayjs";
import { useContext, useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import styled from "styled-components";
import { MainAuth } from "../common/MainAuth";
import { TitleSection } from "../common/TitleSection";
import LoginContext from "../contexts/LoginContext";
import { getHistory } from "../services/trackit";
import Footer from "./Footer";
import Header from "./Header";

export default function HistoricalData() {
    const [data, setData] = useState([]);
    const [days, setDays] = useState([]);

    const { token } = useContext(LoginContext);

    useEffect(() => {
        getHistory(token)
            .then((res) => {
                setData(res.data);
                setDays(res.data.map(v => v.day));
            })
            .catch(() => {
                alert("Houve um erro ao carregar o histórico");
            });
    }, [token]);

    function assignColor({date}) {
        const tileDate = dayjs(date).format("DD/MM/YYYY");
        const today = dayjs().format("DD/MM/YYYY");
        
        if (tileDate !== today && data.some(v => v.day === tileDate)) {
            if (data[days.indexOf(tileDate)].habits.some(v => v.done === false)) {
                return "incomplete";
            }
            else {
                return "complete";
            }
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
                        formatDay={(locale, date) => dayjs(date).format('DD')}
                        tileClassName={assignColor}
                    />
                </CalendarContainer>
                <Footer />
            </MainAuth>
        </>
    );
}

const CalendarContainer = styled.div`
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

  .complete, .incomplete {
    clip-path: circle(35%);
  }

  .complete {
    background-color: #8CC654;
  }

  .incomplete {
    background-color: #EA5766;
  }
`;
