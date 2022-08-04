import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { Input } from "../common/Input";
import { MainAuth } from "../common/MainAuth";
import { TitleSection } from "../common/TitleSection";
import LoginContext from "../contexts/LoginContext";
import { getHabits } from "../services/trackit";
import Footer from "./Footer";
import Header from "./Header";

export default function Habits() {
    const [userHabits, setUserHabits] = useState([]);
    const [disabled, setDisabled] = useState(false);
    const [newHabit, setNewHabit] = useState({ habit: "", open: false });

    const { token } = useContext(LoginContext);

    useEffect(() => {
        getHabits(token)
            .then((res) => {
                setUserHabits(res.data);
            })
            .catch(() => {
                alert("Houve um erro ao carregar os hábitos");
            });
    }, [token]);

    function handleNewHabit({ value, name }) {
        setNewHabit({
            ...newHabit,
            [name]: value,
        });
    }

    function showHabitForm() {
        setNewHabit({
            ...newHabit,
            open: !newHabit.open,
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
                        <form>
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
                                <div>gerso</div>
                            </DaysContainer>
                            <FormBottom>
                                <p onClick={showHabitForm}>Cancelar</p>
                                <div>Salvar</div>
                            </FormBottom>
                        </form>
                    </FormSection>
                )}
                <HabitSection>
                    {userHabits.length === 0 ? (
                        <span>
                            Você não tem nenhum hábito cadastrado ainda. Adicione um hábito
                            para começar a trackear!
                        </span>
                    ) : (
                        <></>
                    )}
                </HabitSection>
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

const HabitSection = styled.section`
  margin-top: 29px;
  color: #666666;

  span {
    font-size: 18px;
  }
`;

const FormSection = styled.section`
  margin-top: 20px;
  height: 180px;
  padding: 18px 17px 15px 19px;
  background-color: #ffffff;
  border-radius: 5px;
`;

const DaysContainer = styled.div`
    margin-top: 8px;
    display: flex;
    column-gap: 4px;

    div {
        width: 30px;
        height: 30px;
    }
`;

const FormBottom = styled.div`
    margin-top: 29px;
    width: 100%;
    display: flex;
    justify-content: flex-end;
    column-gap: 23px;
    align-items: center;
    font-size: 16px;

    p{
        color: #52B6FF;
    }

    div {
        width: 84px;
        height: 35px;
        background-color: #52B6FF;
        color: #FFFFFF;
        border-radius: 4.64px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
`;