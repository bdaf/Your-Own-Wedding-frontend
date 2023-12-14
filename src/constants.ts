export const API_URL = process.env.NODE_ENV === "test" ? "http://mocked-api-url" : import.meta.env.VITE_API_URL;
export const SE_OFFERS = import.meta.env.VITE_SE_OFFERS;
export const API_OFFERS = import.meta.env.VITE_API_SE_OFFERS;