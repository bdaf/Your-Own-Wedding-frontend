import { API_LOGIN, API_REGISTER, API_URL } from "../../constants";
import { handleResponseWithPotentialErrors } from "../errors/errorHandler";
import { UserLogin, UserRegister } from "../models/User";
import axios from 'axios';

function register(user_to_register :UserRegister) {
    return axios.post(`${API_URL}/${API_REGISTER}`, {
        user: { ...user_to_register }
    }, { withCredentials: true })
}

async function login(user_to_login :UserLogin) {
    return axios.post(`${API_URL}/${API_LOGIN}`, {
        user: { ...user_to_login }
    }, { withCredentials: true })
}

async function logged_in() {
    const response = await fetch(`${API_URL}/${API_REGISTER}`, {
        headers: userHeaders
    })
    return handleResponseWithPotentialErrors(response);
}

async function logout() {
    const response = await fetch(`${API_URL}/${API_REGISTER}`, {
        method: "delete",
        headers: userHeaders 
    })
    return handleResponseWithPotentialErrors(response);
}

export {register, login, logged_in, logout}