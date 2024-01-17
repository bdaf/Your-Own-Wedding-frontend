import { OfferModel, offerModelTitleContains, offerModelDescriptionContains, offerModelAddressContains, offerModelCategoryConsistsOf, FiltersModel, EMPTY_FILTER_MODEL } from "../components/Models";
import { OFFERS, API_URL } from "../constants";
import axios from 'axios';

function getAllOffers(filters = EMPTY_FILTER_MODEL) {
    return axios.get(`${API_URL}/${OFFERS}`, { params: { filters: filters }, withCredentials: true })
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

function getOffersFilteredByTitleAndDescription(offers: OfferModel[], filterString: string): OfferModel[] {
    return offers.filter(o => offerModelTitleContains(o, filterString) && offerModelDescriptionContains(o, filterString))
}

function getOffersFilteredByAddress(offers: OfferModel[], filterString: string): OfferModel[] {
    return offers.filter(o => offerModelAddressContains(o, filterString))
}
export {getAllOffers, getOfferById, createOffer, deleteOfferById, getOffersFilteredByTitleAndDescription, getOffersFilteredByAddress}