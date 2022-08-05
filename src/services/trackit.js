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
    const promise = axios.get(`${BASE_URL}/habits`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return promise;
}

function postHabit(body, token) {
    const promise = axios.post(`${BASE_URL}/habits`, body, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return promise;
}

function deleteHabit(id, token) {
    const promise = axios.delete(`${BASE_URL}/habits/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return promise;
}

function getHabitsToday(token) {
    const promise = axios.get(`${BASE_URL}/habits/today`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return promise;
}

export { postSignUp, postLogin, getHabits, postHabit, deleteHabit, getHabitsToday };
