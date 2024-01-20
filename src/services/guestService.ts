import {EMPTY_GUEST_MODEL, GuestModel } from "../components/Models";
import { EVENTS, API_URL, NOTES } from "../constants";
import axios from 'axios';

function getMockGuests() {


    return [EMPTY_GUEST_MODEL, EMPTY_GUEST_MODEL, EMPTY_GUEST_MODEL, EMPTY_GUEST_MODEL, EMPTY_GUEST_MODEL, EMPTY_GUEST_MODEL, EMPTY_GUEST_MODEL, EMPTY_GUEST_MODEL, EMPTY_GUEST_MODEL]
    // console.log(`${API_URL}/${EVENTS}/${event_id}/${NOTES}.json`)
    // return axios.post(`${API_URL}/${EVENTS}/${event_id}/${NOTES}.json`, { note: {...note} }, { withCredentials: true })
}

export {}