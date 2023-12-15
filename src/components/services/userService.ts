import { API_LOGIN, API_REGISTER, API_URL } from "../../constants";
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

    if(!response.ok) {
        throw new Error(`Code: ${response.status}, message: ${response.statusText}`)
    }

    return response.json();
}

async function login(user_to_login :UserLogin) {
    const response = await fetch(`${API_URL}/${API_LOGIN}`, {
        body: JSON.stringify(user_to_login),
        method: "POST",
        headers: userHeaders
    })

    if(!response.ok) {
        throw new Error(`Code: ${response.status}, message: ${response.statusText}`)
    }

    return response.json();
}

async function logged_in() {
    const response = await fetch(`${API_URL}/${API_REGISTER}`, {
        headers: userHeaders
    })

    if(!response.ok) {
        throw new Error(`Code: ${response.status}, message: ${response.statusText}`)
    }

    return response.json();
}

async function logout() {
    const response = await fetch(`${API_URL}/${API_REGISTER}`, {
        method: "delete",
        headers: userHeaders 
    })

    if(!response.ok) {
        throw new Error(`Code: ${response.status}, message: ${response.statusText}`)
    }

    return response.json();
}