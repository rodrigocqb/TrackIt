import { useState } from "react";
import styled from "styled-components";
import { MainAuth } from "../common/MainAuth";
import { TitleSection } from "../common/TitleSection";
import Footer from "./Footer";
import Header from "./Header";

export default function Habits() {
    const [userHabits, setUserHabits] = useState([]);
    return (
        <>
            <Header />
            <MainAuth>
                <TitleSection Button={true}>
                    <h1>Meus hábitos</h1>
                    <AddButton>+</AddButton>
                </TitleSection>
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
    margin-top: 28px;
    color: #666666;
    span {
        font-size: 18px;
    }
`;