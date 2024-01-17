import { useNavigate } from "react-router-dom";
import Filterbar from "../components/layout/Filterbar";
import SEOfferList from "../components/offers/SEOfferList";
import SearchBar from "../components/others/SearchBar";
import {
  getAllOffers,
  getOffersFilteredByTitleAndDescription,
  getOffersFilteredByAddress,
} from "../services/offerService";
import FlashMessagesContext, {
  INFO_FLASH_TYPE,
} from "../store/flash-messages-context";
import { useContext, useEffect, useState } from "react";
import { FiltersModel, OfferModel } from "../components/Models";

function AllSEOffers() {
  const flashMsgCtx = useContext(FlashMessagesContext);
  const [offers, setOffers] = useState<OfferModel[]>([]);
  const [filteredOffers, setFilteredOffers] = useState<OfferModel[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  function setAllOffers(offersToLoad: OfferModel[]) {
    setOffers(offersToLoad);
    setFilteredOffers(offersToLoad);
  }

  async function loadOffers(filters = undefined) {
    setLoading(true);
    try {
      const response = await getAllOffers(filters);
      setAllOffers(response.data);
      flashMsgCtx.setFlashMessage("Offers have been loaded", INFO_FLASH_TYPE);
    } catch (e) {
      flashMsgCtx.handleError(e, useNavigate);
      setError("Error has occured, try again later.");
      console.log("An error occurred: ", e);
    } finally {
      setLoading(false);
    }
  }

  function findOffersHandler(filters: any) {
    loadOffers(filters);
  }

  useEffect(() => {
    loadOffers();
  }, []);

  function filterOffersBySearchBar(filterString: string): void {
    console.log(filterString);
    setFilteredOffers(
      getOffersFilteredByTitleAndDescription(offers, filterString)
    );
  }

  return (
    <div>
      <div className="title">All SEOffers</div>
      <div className="center">
        <Filterbar findFilteredOffers={loadOffers} />
      </div>
      <div className="content-left flex-wrap-2">
        <div className="main-content flex-shrink-high">
          <SearchBar onChangeSearchBar={filterOffersBySearchBar} />
          {error ? (
            <div className="title">Loading...</div>
          ) : loading ? (
            <div className="title">Loading...</div>
          ) : (
            <SEOfferList offers={filteredOffers} />
          )}
        </div>
      </div>
    </div>
  );
}

export default AllSEOffers;
