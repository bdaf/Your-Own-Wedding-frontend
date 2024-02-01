import { OfferModel, offerModelTitleContains, offerModelDescriptionContains, offerModelAddressContains, EMPTY_FILTER_MODEL, OFFER_ID_KEY } from "../components/Models";
import { OFFERS, API_URL, CONTACT, _MY } from "../constants";
import axios from 'axios';

function getAllOffers(filters = EMPTY_FILTER_MODEL) {
    return axios.get(`${API_URL}/${OFFERS}`, { params: { filters: filters }, withCredentials: true })
}

function getMyOffers() {
    return axios.get(`${API_URL}/${OFFERS}${_MY}`, { withCredentials: true })
}

function getOfferById(id :string) {
    return axios.get(`${API_URL}/${OFFERS}/${id}`, { withCredentials: true })
}

function getOfferContactByOfferId(id :string) {
    return axios.get(`${API_URL}/${OFFERS}/${id}/${CONTACT}`, { withCredentials: true })
}

function createOffer(formData: FormData) {
    return axios.post(`${API_URL}/${OFFERS}`, formData, { withCredentials: true })
}

function updateOffer(formData: FormData) {
    return axios.put(`${API_URL}/${OFFERS}/${formData.get(OFFER_ID_KEY)}`, formData, { withCredentials: true })
}

function deleteOfferById(id: string) {
    return axios.delete(`${API_URL}/${OFFERS}/${id}`, { withCredentials: true })
}

function getOffersFilteredByTitleAndDescription(offers: OfferModel[], filterString: string): OfferModel[] {
    return offers.filter(o => offerModelTitleContains(o, filterString) && offerModelDescriptionContains(o, filterString))
}

function getOffersFilteredByAddress(offers: OfferModel[], filterString: string): OfferModel[] {
    return offers.filter(o => offerModelAddressContains(o, filterString))
}
export {getAllOffers, getMyOffers, getOfferById, getOfferContactByOfferId, createOffer, updateOffer, deleteOfferById, 
    getOffersFilteredByTitleAndDescription, getOffersFilteredByAddress}