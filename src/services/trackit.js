import axios from "axios";

const BASE_URL = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit";

function postSignUp(body) {
    const promise = axios.post(`${BASE_URL}/auth/sign-up`, body);
    return promise;
}

function postLogin(body) {
    const promise = axios.post(`${BASE_URL}/auth/login`, body);
    return promise;
}

function getHabits(token) {
    const promise = axios.get(`${BASE_URL}/habits`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );
    return promise;
}

export { postSignUp, postLogin, getHabits };