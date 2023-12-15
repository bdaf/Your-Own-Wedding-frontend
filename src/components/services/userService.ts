import { API_LOGIN, API_REGISTER, API_URL } from "../../constants";
import { handleResponseWithPotentialErrors } from "../errors/errorHandler";
import { UserLogin, UserRegister } from "../models/User";

const userHeaders = { 
    "Content/Type" : "application/json", 
    "useCredentials" : "true"
}

async function register(user_to_register :UserRegister) {
    const response =  await fetch(`${API_URL}/${API_REGISTER}`, {
        body: JSON.stringify(user_to_register),
        method: "POST",
        headers: userHeaders
    })
    return handleResponseWithPotentialErrors(response);
}

async function login(user_to_login :UserLogin) {
    const response = await fetch(`${API_URL}/${API_LOGIN}`, {
        body: JSON.stringify(user_to_login),
        method: "POST",
        headers: userHeaders
    })
    return handleResponseWithPotentialErrors(response);
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