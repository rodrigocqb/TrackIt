import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import updateLocale from "dayjs/plugin/updateLocale";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { MainAuth } from "../common/MainAuth";
import { TitleSection } from "../common/TitleSection";
import LoginContext from "../contexts/LoginContext";
import { getHabitsToday } from "../services/trackit";
import Footer from "./Footer";
import Header from "./Header";
import TodayHabit from "./TodayHabit";

export default function Today() {
    const [habitsToday, setHabitsToday] = useState([]);

    const { token } = useContext(LoginContext);

    dayjs.extend(updateLocale);
    dayjs.updateLocale("pt-br", {
        weekdays: [
            "Domingo",
            "Segunda",
            "Terça",
            "Quarta",
            "Quinta",
            "Sexta",
            "Sábado",
        ],
    });

    const today = dayjs().locale("pt-br").format("dddd, DD/MM");

    useEffect(() => {
        getHabitsToday(token)
            .then((res) => {
                setHabitsToday(res.data);
            })
            .catch(() => {
                alert("Houve um erro ao carregar seus hábitos de hoje");
            });
    }, [token]);

    return (
        <>
            <Header />
            <MainAuth>
                <TitleSection>
                    <div>
                        <h1>{today}</h1>
                        <ProgressContainer>
                            <p>Nenhum hábito concluído ainda</p>
                        </ProgressContainer>
                    </div>
                </TitleSection>
                <TodaySection>
                    {habitsToday.map((value, index) => (
                        <TodayHabit
                            key={index}
                            id={value.id}
                            name={value.name}
                            done={value.done}
                            currentSequence={value.currentSequence}
                            highestSequence={value.highestSequence}
                        />
                    ))}
                </TodaySection>
            </MainAuth>
            <Footer />
        </>
    );
}

const ProgressContainer = styled.div`
  margin-top: 5px;
  font-size: 18px;
  color: ${(props) => (props.done ? "#8FC549" : "#BABABA")};
`;

const TodaySection = styled.section`
  margin-top: 29px;
  margin-bottom: 50px;
  display: flex;
  flex-direction: column;
  row-gap: 10px;
`;
