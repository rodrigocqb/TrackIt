import { useEffect, useState } from "react";
import styled from "styled-components";

export default function DayButton({
  children,
  id,
  disabled,
  newHabit,
  setNewHabit,
}) {
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    if (newHabit.days.includes(id)) {
      setClicked(true);
    }
  }, [id, newHabit.days]);

  return (
    <Day
      disabled={disabled}
      clicked={clicked}
      onClick={() => {
        setClicked(!clicked);
        if (newHabit.days.includes(id)) {
          setNewHabit({
            ...newHabit,
            days: newHabit.days.filter((value) => {
              if (value !== id) {
                return true;
              }
              return false;
            }),
          });
        } else {
          setNewHabit({
            ...newHabit,
            days: [...newHabit.days, id],
          });
        }
      }}
    >
      {children}
    </Day>
  );
}

const Day = styled.button`
  width: 30px;
  height: 30px;
  background-color: ${(props) => (props.clicked ? "#CFCFCF" : "#FFFFFF")};
  border: 1px solid ${(props) => (props.clicked ? "#CFCFCF" : "#D5D5D5")};
  border-radius: 5px;
  color: ${(props) => (props.clicked ? "#FFFFFF" : "#DBDBDB")};
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
