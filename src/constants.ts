export const API_URL = process.env.NODE_ENV === "test" ? "http://mocked-api-url" : import.meta.env.VITE_API_URL;
export const SE_OFFERS = import.meta.env.VITE_SE_OFFERS;
export const API_OFFERS = import.meta.env.VITE_API_SE_OFFERS;
export const API_REGISTER = import.meta.env.VITE_API_REGISTER;
export const API_LOGIN = import.meta.env.VITE_API_LOGIN;
export const API_LOGGED_IN = import.meta.env.VITE_API_LOGGED_IN;
export const API_LOGOUT = import.meta.env.VITE_API_LOGOUT;