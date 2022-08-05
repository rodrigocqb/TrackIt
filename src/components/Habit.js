import { useContext } from "react";
import styled from "styled-components";
import LoginContext from "../contexts/LoginContext";
import { deleteHabit } from "../services/trackit";

export default function Habit({ id, name, days, weekdays, loadSwitch, setLoadSwitch }) {
    const { token } = useContext(LoginContext);

    function removeHabit() {
        if (window.confirm("Tem certeza que deseja deletar este hábito?")){
            deleteHabit(id, token)
                .then(() => {
                    setLoadSwitch(!loadSwitch);
                })
                .catch(() => {
                    alert("Houve um erro ao tentar deletar o hábito");
                })
        }
    }

    return (
        <HabitWrapper>
            <p>{name}</p>
            <div>
                {weekdays.map((value, index) => (
                    <Day active={days.includes(index)} key={index}>{value}</Day>
                ))}
            </div>
            <IconContainer onClick={removeHabit}>
                <ion-icon name="trash-outline"></ion-icon>
            </IconContainer>
        </HabitWrapper>
    );
}

const HabitWrapper = styled.div`
    width: 100%;
    height: 91px;
    background-color: #FFFFFF;
    border-radius: 5px;
    font-size: 20px;
    padding: 15px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;

    p {
        color: #666666;
    }

    div {
        display: flex;
        column-gap: 4px;
    }
`;

const Day = styled.div`
    width: 30px;
    height: 30px;
    background-color: ${(props) => (props.active ? "#CFCFCF" : "#FFFFFF")};
    border: 1px solid ${(props) => (props.active ? "#CFCFCF" : "#D5D5D5")};
    border-radius: 5px;
    color: ${(props) => (props.active ? "#FFFFFF" : "#DBDBDB")};
    font-size: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const IconContainer = styled.div`
    width: 17px;
    height: 17px;
    position: absolute;
    z-index: 1;
    top: 11px;
    right: 10px;
    
    ion-icon {
        color: #666666;
        font-size: 17px;
    }
`;