import { API_OFFERS, API_URL } from "../constants";
import { handleResponseWithPotentialErrors } from "../errors/errorHandler";
import axios from 'axios';


async function getAllOffers() {
    const response = await fetch(`${API_URL}/${API_OFFERS}`);
    return handleResponseWithPotentialErrors(response);
}

async function getOfferById(id :string) {
    const response = await fetch(`${API_URL}/${API_OFFERS}/${id}`);
    return handleResponseWithPotentialErrors(response);
}

async function createOffer(offer:any) {
    const response = await fetch(`${API_URL}/${API_OFFERS}`, {
        method: "post", 
        body: JSON.stringify(offer), 
        headers: {
            "Content-Type":"application/json"
        }
    })
    return handleResponseWithPotentialErrors(response);
}

function createAxiosOffer(formData: any) {
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

export {getAllOffers, getOfferById, createOffer, createOfferWithFormData, createAxiosOffer, deleteOfferById}