import { UserModel, UserLogin, UserRegister } from "../components/Models";
import { LOGGED_IN, LOGIN, LOGOUT, REGISTER, API_URL, PROFILE, HOME_PAGE_USER_DATA } from "../constants";
import axios from 'axios';

function register(user_to_register :UserRegister) {
    return axios.post(`${API_URL}/${REGISTER}.json`, {
        user: { ...user_to_register }
    }, { withCredentials: true })
}

function updateProfile(user :UserModel) {
    return axios.put(`${API_URL}/${PROFILE}.json`, {
        user: { ...user }
    }, { withCredentials: true })
}

function login(user_to_login :UserLogin) {
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

function homePageUserData() {
    return axios.get(`${API_URL}/${HOME_PAGE_USER_DATA}.json`,
    { withCredentials: true })
}

export {register, updateProfile, login, logged_in, logout, homePageUserData}