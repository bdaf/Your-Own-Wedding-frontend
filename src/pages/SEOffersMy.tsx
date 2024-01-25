import { useNavigate } from "react-router-dom";
import SEOfferList from "../components/offers/SEOfferList";
import { getMyOffers } from "../services/offerService";
import FlashMessagesContext, {
  INFO_FLASH_TYPE,
} from "../store/flash-messages-context";
import { useContext, useEffect, useState } from "react";
import { OfferModel } from "../components/Models";

function MySEOffers() {
  const flashMsgCtx = useContext(FlashMessagesContext);
  const [offers, setOffers] = useState<OfferModel[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  function setAllOffers(offersToLoad: OfferModel[]) {
    setOffers(offersToLoad);
  }

  async function loadOffers() {
    setLoading(true);
    try {
      const response = await getMyOffers();
      setAllOffers(response.data);
    } catch (e) {
      flashMsgCtx.handleError(e, useNavigate);
      setError("Error has occured, try again later.");
      console.log("An error occurred: ", e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadOffers();
  }, []);

  return (
    <div>
      <div className="title">My Offers</div>
      <div className="center">
        <div className="main-content flex-shrink-high">
          {error ? (
            <div className="title">Loading...</div>
          ) : loading ? (
            <div className="title">Loading...</div>
          ) : (
            <SEOfferList offers={offers} />
          )}
        </div>
      </div>
    </div>
  );
}

export default MySEOffers;
