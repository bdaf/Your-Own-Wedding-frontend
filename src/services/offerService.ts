import { OfferModel, offerModelcontains } from "../components/Models";
import { OFFERS, API_URL } from "../constants";
import axios from 'axios';

function getAllOffers() {
    return axios.get(`${API_URL}/${OFFERS}`, { withCredentials: true })
}

function getOfferById(id :string) {
    return axios.get(`${API_URL}/${OFFERS}/${id}`, { withCredentials: true })
}

function createOffer(formData: any) {
    return axios.post(`${API_URL}/${OFFERS}`, formData, { withCredentials: true })
}

function deleteOfferById(id: string) {
    return axios.delete(`${API_URL}/${OFFERS}/${id}`, { withCredentials: true })
}

function getOffersFilteredByString(offers: OfferModel[], filterString: string): OfferModel[] {
    return offers.filter(o => offerModelcontains(o, filterString))
}
export {getAllOffers, getOfferById, createOffer, deleteOfferById, getOffersFilteredByString}