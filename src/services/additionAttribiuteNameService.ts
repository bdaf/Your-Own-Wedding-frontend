
import { NameModel } from "../components/Models";
import { API_URL, NAMES, _MY } from "../constants";
import axios from 'axios';

function getMyNames() {
    console.log(`${API_URL}/${NAMES}.json`)
    return axios.get(`${API_URL}/${NAMES}.json`, { withCredentials: true })
}

function createName(name: NameModel) {
    console.log(`${API_URL}/${NAMES}.json`)
    return axios.post(`${API_URL}/${NAMES}.json`, {addition_attribiute_name: {...name}} , { withCredentials: true })
}

// function updateGuest(guest: GuestModel) {
//     return axios.put(`${API_URL}/${GUESTS}/${guest.id}.json`, {guest: {...guest}} , { withCredentials: true })
// }

function deleteName(name: NameModel) {
    console.log(`${API_URL}/${NAMES}/${name.id}.json`)
    return axios.delete(`${API_URL}/${NAMES}/${name.id}.json`, { withCredentials: true })
}

export {getMyNames, createName, deleteName}