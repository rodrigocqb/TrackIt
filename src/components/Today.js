import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import updateLocale from "dayjs/plugin/updateLocale";
import { useContext } from "react";
import { MainAuth } from "../common/MainAuth";
import { TitleSection } from "../common/TitleSection";
import LoginContext from "../contexts/LoginContext";
import Footer from "./Footer";
import Header from "./Header";

export default function Today() {
    const { token } = useContext(LoginContext);

    dayjs.extend(updateLocale);
    dayjs.updateLocale("pt-br", {
        weekdays: ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"],
    });

    const today = dayjs().locale("pt-br").format("dddd, DD/MM");

    return (
        <>
            <Header />
            <MainAuth>
                <TitleSection>
                    <div>
                        <h1>{today}</h1>
                        <p>Nenhum hábito concluído ainda</p> {/* still have to add margin to this after making it functional */}
                    </div>
                </TitleSection>
            </MainAuth>
            <Footer />
        </>
    );
}