
import { GuestModel } from "../components/Models";
import { API_URL, GUESTS, _MY } from "../constants";
import axios from 'axios';

function getMyGuests() {
    return axios.get(`${API_URL}/${GUESTS}${_MY}.json`, { withCredentials: true })
}

function createGuest(guest: GuestModel) {
    return axios.post(`${API_URL}/${GUESTS}.json`, {guest: {...guest}} , { withCredentials: true })
}

export {getMyGuests, createGuest}