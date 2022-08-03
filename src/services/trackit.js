import axios from "axios";

const BASE_URL = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit";

function postSignUp(body) {
    const promise = axios.get(`${BASE_URL}/auth/sign-up`, body);
    return promise
}

export { postSignUp };