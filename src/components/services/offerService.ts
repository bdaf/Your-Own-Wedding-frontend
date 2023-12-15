import { API_OFFERS, API_URL } from "../../constants";


async function getAllOffers() {
    const response = await fetch(`${API_URL}/${API_OFFERS}`);
    if(!response.ok){
        throw new Error(`Code: ${response.status}. Message: ${response.statusText}`);
    }
    return response.json();
}

async function getOfferById(id :string) {
    const response = await fetch(`${API_URL}/${API_OFFERS}/${id}`);
    if(!response.ok){
        throw new Error(`Code: ${response.status}. Message: ${response.statusText}`);
    }
    return response.json();
}

async function createOffer(offer:any) {
    const response = await fetch(`${API_URL}/${API_OFFERS}`, {
        method: "post", 
        body: JSON.stringify(offer), 
        headers: {
            "Content-Type":"application/json"
        }
    })
    if(!response.ok) {
        throw new Error(`Code: ${response.status}, message: ${response.statusText}`);
    }
    return response.json();
}

async function deleteOfferById(id : string) {
    const response = await fetch(`${API_URL}/${API_OFFERS}/${id}`, {method: "delete"});
    if(!response.ok){
        throw new Error(`Code: ${response.status}. Message: ${response.statusText}`);
    }
    // status 204 means No Content
    if(response.status === 204) return null;
    return response.json();
}

export {getAllOffers, getOfferById, createOffer, deleteOfferById}