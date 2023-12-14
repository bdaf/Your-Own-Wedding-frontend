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

async function deleteOfferById(id : string) {
    const response = await fetch(`${API_URL}/${API_OFFERS}/${id}`, {method: "delete"});
    if(!response.ok){
        throw new Error(`Code: ${response.status}. Message: ${response.statusText}`);
        return false;
    }
    return true;
}

export {getAllOffers, getOfferById, deleteOfferById}