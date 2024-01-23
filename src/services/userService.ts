import { User, UserLogin, UserRegister } from "../components/Models";
import { LOGGED_IN, LOGIN, LOGOUT, REGISTER, API_URL, PROFILE } from "../constants";
import axios from 'axios';

function register(user_to_register :UserRegister) {
    return axios.post(`${API_URL}/${REGISTER}.json`, {
        user: { ...user_to_register }
    }, { withCredentials: true })
}

function updateProfile(user :User) {
    return axios.put(`${API_URL}/${PROFILE}.json`, {
        user: { ...user }
    }, { withCredentials: true })
}

function login(user_to_login :UserLogin) {
    console.log(`${API_URL}/${LOGIN}`)
    return axios.post(`${API_URL}/${LOGIN}.json`, {
        user: { ...user_to_login }
    }, { withCredentials: true })
}

function logged_in() {
    return axios.get(`${API_URL}/${LOGGED_IN}.json`,
    { withCredentials: true })
}

function logout() {
    return axios.delete(`${API_URL}/${LOGOUT}.json`,
    { withCredentials: true })
}

export {register, updateProfile, login, logged_in, logout}