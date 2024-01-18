import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import SEOfferForm from "../components/offers/SEOfferForm";
import { getOfferById, updateOffer } from "../services/offerService";
import { EMPTY_OFFER_MODEL, OfferModel } from "../components/Models";
import FlashMessagesContext from "../store/flash-messages-context";

function SEOfferEdit() {
  const flashMsgCtx = useContext(FlashMessagesContext);
  const navigate = useNavigate();
  const [offer, setOffer] = useState<OfferModel>(EMPTY_OFFER_MODEL);
  const [loading, setLoading] = useState<boolean>(false);
  const formData = new FormData();
  const offerId = useParams().id!;

  useEffect(() => {
    setLoading(true);
    getOfferById(offerId)
      .then((res) => {
        setOffer(res.data);
        formData.append("offers[id]", offerId);
      })
      .catch((err) => {
        flashMsgCtx.handleError(err, navigate);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <div className="title">Edit SEOffer</div>
      {loading ? (
        <div className="title">Loading...</div>
      ) : (
        <SEOfferForm
          serviceOffer={updateOffer}
          formData={formData}
          offer={offer}
        />
      )}
    </div>
  );
}

export default SEOfferEdit;
