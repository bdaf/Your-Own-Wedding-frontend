import { LOGGED_IN, LOGIN, LOGOUT, REGISTER, API_URL } from "../constants";
import { UserLogin, UserRegister } from "../models/User";
import axios from 'axios';

function register(user_to_register :UserRegister) {
    return axios.post(`${API_URL}/${REGISTER}`, {
        user: { ...user_to_register }
    }, { withCredentials: true })
}

function login(user_to_login :UserLogin) {
    return axios.post(`${API_URL}/${LOGIN}`, {
        user: { ...user_to_login }
    }, { withCredentials: true })
}

function logged_in() {
    return axios.get(`${API_URL}/${LOGGED_IN}`,
    { withCredentials: true })
}

function logout() {
    return axios.delete(`${API_URL}/${LOGOUT}`,
    { withCredentials: true })
}

export {register, login, logged_in, logout}