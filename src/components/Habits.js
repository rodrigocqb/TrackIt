import dayjs from "dayjs";
import { useContext, useEffect, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import styled from "styled-components";
import { Button } from "../common/Button";
import { Input } from "../common/Input";
import { MainAuth } from "../common/MainAuth";
import { TitleSection } from "../common/TitleSection";
import LoginContext from "../contexts/LoginContext";
import ProgressContext from "../contexts/ProgressContext";
import { getHabits, postHabit } from "../services/trackit";
import DayButton from "./DayButton";
import Footer from "./Footer";
import Habit from "./Habit";
import Header from "./Header";

export default function Habits() {
    const [userHabits, setUserHabits] = useState([]);
    const [disabled, setDisabled] = useState(false);
    const [newHabit, setNewHabit] = useState({
        habit: "",
        open: false,
        days: [],
    });
    const [loadSwitch, setLoadSwitch] = useState(false);

    const { token } = useContext(LoginContext);
    const { todayDone, setTodayDone, setProgress } = useContext(ProgressContext);

    const weekdays = ["D", "S", "T", "Q", "Q", "S", "S"];
    const today = dayjs().format("d");

    useEffect(() => {
        getHabits(token)
            .then((res) => {
                setUserHabits(res.data);
            })
            .catch(() => {
                alert("Houve um erro ao carregar os hábitos");
            });
    }, [token, loadSwitch]);

    function handleNewHabit({ value, name }) {
        setNewHabit({
            ...newHabit,
            [name]: value,
        });
    }

    function showHabitForm() {
        setDisabled(false);
        setNewHabit({
            ...newHabit,
            open: !newHabit.open,
        });
    }

    function createHabit() {
        if (newHabit.days.length === 0) {
            return alert("Selecione pelo menos um dia para o seu hábito!");
        }

        setDisabled(true);
        const body = {
            name: newHabit.habit,
            days: newHabit.days,
        };

        postHabit(body, token)
            .then(() => {
                if (body.days.includes(Number(today))) {
                    setProgress(
                        Math.round(
                            (todayDone.numberDone / (todayDone.numberTotal + 1)) * 100
                        )
                    );
                    setTodayDone({
                        ...todayDone,
                        numberTotal: todayDone.numberTotal + 1,
                    });
                }
                setNewHabit({
                    habit: "",
                    open: false,
                    days: [],
                });
                setLoadSwitch(!loadSwitch);
            })
            .catch(() => {
                alert("Insira dados válidos!");
                setDisabled(false);
            });
    }

    return (
        <>
            <Header />
            <MainAuth>
                <TitleSection Button={true}>
                    <h1>Meus hábitos</h1>
                    <AddButton onClick={showHabitForm}>+</AddButton>
                </TitleSection>
                {newHabit.open && (
                    <FormSection>
                        <div>
                            <Input
                                type="text"
                                placeholder="nome do hábito"
                                name="habit"
                                value={newHabit.habit}
                                onChange={(e) => {
                                    handleNewHabit({
                                        name: e.target.name,
                                        value: e.target.value,
                                    });
                                }}
                                disabled={disabled}
                                required
                            ></Input>
                            <DaysContainer>
                                {weekdays.map((value, index) => (
                                    <DayButton
                                        key={index}
                                        id={index}
                                        disabled={disabled}
                                        newHabit={newHabit}
                                        setNewHabit={setNewHabit}
                                    >
                                        {value}
                                    </DayButton>
                                ))}
                            </DaysContainer>
                            <FormBottom>
                                <p onClick={showHabitForm}>Cancelar</p>
                                <SaveButton
                                    type="submit"
                                    disabled={disabled}
                                    onClick={createHabit}
                                >
                                    {disabled ? (
                                        <ThreeDots
                                            height="13"
                                            width="51"
                                            color="#FFFFFF"
                                            ariaLabel="three-dots-loading"
                                        />
                                    ) : (
                                        <span>Salvar</span>
                                    )}
                                </SaveButton>
                            </FormBottom>
                        </div>
                    </FormSection>
                )}
                <HabitsSection>
                    {userHabits.length === 0 ? (
                        <span>
                            Você não tem nenhum hábito cadastrado ainda. Adicione um hábito
                            para começar a trackear!
                        </span>
                    ) : (
                        <HabitsContainer>
                            {userHabits.map((value) => (
                                <Habit
                                    id={value.id}
                                    name={value.name}
                                    days={value.days}
                                    weekdays={weekdays}
                                    key={value.id}
                                    loadSwitch={loadSwitch}
                                    setLoadSwitch={setLoadSwitch}
                                />
                            ))}
                        </HabitsContainer>
                    )}
                </HabitsSection>
            </MainAuth>
            <Footer />
        </>
    );
}

const AddButton = styled.div`
  width: 40px;
  height: 35px;
  background-color: #52b6ff;
  border-radius: 4.64px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ffffff;
  font-size: 27px;
`;

const HabitsSection = styled.section`
  margin-top: 20px;
  margin-bottom: 50px;
  color: #666666;

  span {
    padding-top: 9px;
    font-size: 18px;
  }
`;

const HabitsContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 10px;
`;

const FormSection = styled.section`
  margin-top: 20px;
  margin-bottom: 9px;
  height: 180px;
  padding: 18px 17px 15px 19px;
  background-color: #ffffff;
  border-radius: 5px;
`;

const DaysContainer = styled.div`
  margin-top: 8px;
  display: flex;
  column-gap: 4px;
`;

const FormBottom = styled.div`
  margin-top: 29px;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  column-gap: 23px;
  align-items: center;
  font-size: 16px;

  p {
    color: #52b6ff;
  }
`;

const SaveButton = styled(Button)`
  width: 84px;
  height: 35px;
  font-size: 16px;
  font-family: "Lexend Deca", sans-serif;
`;
