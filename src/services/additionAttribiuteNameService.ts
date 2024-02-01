
import { NameModel } from "../components/Models";
import { API_URL, NAMES, _MY } from "../constants";
import axios from 'axios';

function getMyNames() {
    return axios.get(`${API_URL}/${NAMES}.json`, { withCredentials: true })
}

function createName(name: NameModel) {
    return axios.post(`${API_URL}/${NAMES}.json`, {addition_attribiute_name: {...name}} , { withCredentials: true })
}

function deleteName(name: NameModel) {
    return axios.delete(`${API_URL}/${NAMES}/${name.id}.json`, { withCredentials: true })
}

export {getMyNames, createName, deleteName}