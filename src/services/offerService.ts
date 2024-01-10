import { API_OFFERS, API_URL } from "../constants";
import { handleResponseWithPotentialErrors } from "../errors/errorHandler";
import axios from 'axios';

function getAllOffers() {
    return axios.get(`${API_URL}/${API_OFFERS}`, { withCredentials: true })
}

function getOfferById(id :string) {
    return axios.get(`${API_URL}/${API_OFFERS}/${id}`, { withCredentials: true })
}

function createOffer(formData: any) {
    return axios.post(`${API_URL}/${API_OFFERS}`, formData, { withCredentials: true })
}

function createOfferWithFormData(formData: any) {
    console.log(formData)
    return fetch(`${API_URL}/${API_OFFERS}`, {
        method: "post", 
        body: formData
    }).then((res) => res.json())
}


async function deleteOfferById(id : string) {
    const response = await fetch(`${API_URL}/${API_OFFERS}/${id}`, {method: "delete"});
    if(!response.ok){
        throw new Error(`Code: ${response.status}. Message: ${response.statusText}`);
    }
    // TODO - Remember to manually set a returning json because by dafault it is just status 204 which means no content
    return handleResponseWithPotentialErrors(response);
}

export {getAllOffers, getOfferById, createOffer, createOfferWithFormData, deleteOfferById}