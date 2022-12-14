import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import updateLocale from "dayjs/plugin/updateLocale";
import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ThreeDots } from "react-loader-spinner";
import styled from "styled-components";
import { MainAuth } from "../../common/MainAuth";
import { TitleSection } from "../../common/TitleSection";
import LoginContext from "../../contexts/LoginContext";
import ProgressContext from "../../contexts/ProgressContext";
import { getHabitsToday } from "../../services/trackit";
import Footer from "../Footer";
import Header from "../Header";
import TodayHabit from "./TodayHabit";

export default function Today() {
  const [habitsToday, setHabitsToday] = useState([]);
  const [loadSwitch, setLoadSwitch] = useState(false);
  const [loaderSpinner, setLoaderSpinner] = useState(true);

  const { token } = useContext(LoginContext);
  const { progress, setProgress, setTodayDone } = useContext(ProgressContext);

  const { t, i18n } = useTranslation();

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

  let today;

  useEffect(() => {
    getHabitsToday(token)
      .then((res) => {
        setHabitsToday(res.data);
        setProgress(
          Math.round(
            (res.data.filter((value) => value.done === true).length /
              res.data.length) *
              100
          )
        );
        setTodayDone({
          doneIds: res.data
            .filter((value) => value.done === true)
            .map((v) => v.id),
          numberDone: res.data.filter((value) => value.done === true).length,
          numberTotal: res.data.length,
        });
        setLoaderSpinner(false);
      })
      .catch(() => {
        alert("Houve um erro ao carregar seus hábitos de hoje");
        setLoaderSpinner(false);
      });
  }, [token, loadSwitch, setProgress, setTodayDone, setLoaderSpinner]);

  switch (i18n.resolvedLanguage) {
    case "pt-BR":
      today = dayjs().locale("pt-br").format("dddd, DD/MM");
      break;

    case "en":
      today = dayjs().locale("en-us").format("dddd, MM/DD");
      break;

    default:
      return;
  }

  return (
    <>
      <Header />
      <MainAuth>
        <TitleSection>
          <div>
            <h1>{today}</h1>
            {!loaderSpinner && (
              <ProgressContainer done={progress}>
                <p>
                  {progress
                    ? `${progress}% ${t("progressSome")}`
                    : `${t("progressNone")}`}
                </p>
              </ProgressContainer>
            )}
          </div>
        </TitleSection>
        {loaderSpinner && (
          <ThreeDots
            height="80"
            width="80"
            color="#52b6ff"
            ariaLabel="three-dots-loading"
          />
        )}
        <TodaySection>
          {habitsToday.map((value, index) => (
            <TodayHabit
              key={index}
              id={value.id}
              name={value.name}
              done={value.done}
              currentSequence={value.currentSequence}
              highestSequence={value.highestSequence}
              loadSwitch={loadSwitch}
              setLoadSwitch={setLoadSwitch}
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
