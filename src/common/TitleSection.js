import styled from "styled-components";

export const TitleSection = styled.section`
    width: 100%;
    margin-top: ${props => props.Button ? "22px" : "28px"};
    display: flex;
    justify-content: space-between;
    align-items: center;

    h1 {
        font-size: 23px;
        color: #126BA5;
    }
`;