import styled from "styled-components";
import { MainAuth } from "../common/MainAuth";
import { TitleSection } from "../common/TitleSection";
import Footer from "./Footer";
import Header from "./Header";

export default function HistoricalData() {
    return (
        <>
            <MainAuth>
                <Header />
                <TitleSection>
                    <h1>Histórico</h1>
                </TitleSection>
                <SpanWrapper>
                    <span>Em breve você poderá ver o histórico dos seus hábitos aqui!</span>
                </SpanWrapper>
                <Footer />
            </MainAuth>
        </>
    );
}

const SpanWrapper = styled.div`
    margin-top: 20px;
    color: #666666;
    font-size: 18px;
`;