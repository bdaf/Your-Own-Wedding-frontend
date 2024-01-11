import { EVENTS, API_URL } from "../constants";
import axios from 'axios';

function getMyEvents() {
    return axios.get(`${API_URL}/${EVENTS}_my.json`, { withCredentials: true })
}

function getEventById(id :string) {
    return axios.get(`${API_URL}/${EVENTS}/${id}`, { withCredentials: true })
}

function createEvent(formData: any) {
    return axios.post(`${API_URL}/${EVENTS}`, formData, { withCredentials: true })
}

function deleteEventById(id: string) {
    return axios.delete(`${API_URL}/${EVENTS}/${id}`, { withCredentials: true })
}
export {getMyEvents as getAllEvents, getEventById, createEvent, deleteEventById}