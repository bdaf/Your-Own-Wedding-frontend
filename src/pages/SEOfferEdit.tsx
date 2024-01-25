import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import SEOfferForm from "../components/offers/SEOfferForm";
import {
  deleteOfferById,
  getOfferById,
  updateOffer,
} from "../services/offerService";
import {
  EMPTY_OFFER_MODEL,
  OFFER_ID_KEY,
  OfferModel,
} from "../components/Models";
import FlashMessagesContext from "../store/flash-messages-context";
import { OFFERS } from "../constants";

function SEOfferEdit() {
  const flashMsgCtx = useContext(FlashMessagesContext);
  const navigate = useNavigate();
  const [offer, setOffer] = useState<OfferModel>(EMPTY_OFFER_MODEL);
  const [loading, setLoading] = useState<boolean>(false);
  const offerId = useParams().id!;

  useEffect(() => {
    setLoading(true);
    getOfferById(offerId)
      .then((res) => {
        setOffer(res.data);
      })
      .catch((err) => {
        flashMsgCtx.handleError(err, navigate);
      })
      .finally(() => setLoading(false));
  }, []);

  function deleteOfferHandler(): void {
    setLoading(true);
    deleteOfferById(offerId)
      .then((res) => {
        navigate(`/${OFFERS}`);
        flashMsgCtx.handleSuccess(res);
      })
      .catch((e) => {
        flashMsgCtx.handleError(e, navigate);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <div>
      <div className="title">Edit SEOffer</div>
      {loading ? (
        <div className="title">Loading...</div>
      ) : (
        <SEOfferForm
          serviceOffer={updateOffer}
          offer_id={offerId}
          offer={offer}
          action={"update"}
          deleteOffer={deleteOfferHandler}
        />
      )}
    </div>
  );
}

export default SEOfferEdit;
