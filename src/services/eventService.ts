import { EVENTS, API_URL } from "../constants";
import axios from 'axios';

function getMyEvents() {
    return axios.get(`${API_URL}/${EVENTS}_my.json`, { withCredentials: true })
}

function getEventById(id :string) {
    return axios.get(`${API_URL}/${EVENTS}/${id}.json`, { withCredentials: true })
}

function createEvent(event: any) {
    return axios.post(`${API_URL}/${EVENTS}.json`, { event: {...event} }, { withCredentials: true })
}

function editEvent(event: any) {
    return axios.put(`${API_URL}/${EVENTS}/${event.id}.json`, { event: {...event} }, { withCredentials: true })
}

function deleteEventById(id: string) {
    return axios.delete(`${API_URL}/${EVENTS}/${id}.json`, { withCredentials: true })
}
export {getMyEvents as getAllEvents, getEventById, createEvent, editEvent, deleteEventById}