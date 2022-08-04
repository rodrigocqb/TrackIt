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

    const { token } = useContext(LoginContext);

    useEffect(() => {
        getHabits(token)
            .then((res) => {
                setUserHabits(res.data);
            })
            .catch(() => {
                alert("Houve um erro ao carregar os hábitos");
            });
    }, []);

    return (
        <>
            <Header />
            <MainAuth>
                <TitleSection Button={true}>
                    <h1>Meus hábitos</h1>
                    <AddButton>+</AddButton>
                </TitleSection>
                <FormSection>
                    <Input></Input>
                </FormSection>
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
    background-color: #FFFFFF;
    border-radius: 5px;
`;