import { useContext, useEffect, useState } from "react";
import { EMPTY_OFFER_MODEL, OfferModel } from "../components/Models";
import SEOfferForm from "../components/offers/SEOfferForm";
import { createOffer } from "../services/offerService";
import AuthenticationContext from "../store/authentication-context";

function NewSEOffer() {
  const authCtx = useContext(AuthenticationContext);
  const [offer, setOffer] = useState<OfferModel>(EMPTY_OFFER_MODEL);

  useEffect(() => {
    if (authCtx.isSupportUser()) {
      setOffer({
        ...offer,
        address: authCtx.getCurrentUser().provider!.address!,
      });
    }
  }, []);
  return (
    <div>
      <div className="title">Create SEOffer</div>
      <SEOfferForm serviceOffer={createOffer} offer={offer} action={"create"} />
    </div>
  );
}

export default NewSEOffer;
