export const API_URL = process.env.NODE_ENV === "test" ? "http://mocked-api-url" : import.meta.env.VITE_API_URL;
export const PROFILE = import.meta.env.VITE_PROFILE;
export const REGISTER = import.meta.env.VITE_REGISTER;
export const LOGIN = import.meta.env.VITE_LOGIN;
export const LOGGED_IN = import.meta.env.VITE_LOGGED_IN;
export const LOGOUT = import.meta.env.VITE_LOGOUT;
export const HOME_PAGE_USER_DATA = import.meta.env.VITE_HOME_PAGE_USER_DATA;
export const OFFERS = import.meta.env.VITE_OFFERS;
export const EVENTS = import.meta.env.VITE_EVENTS;
export const NOTES = import.meta.env.VITE_NOTES;
export const GUESTS = import.meta.env.VITE_GUESTS;
export const NAMES = import.meta.env.VITE_NAMES;

export const _MY = import.meta.env.VITE__MY;
export const CONTACT = import.meta.env.VITE_CONTACT;