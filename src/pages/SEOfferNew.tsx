import { EMPTY_OFFER_MODEL } from "../components/Models";
import SEOfferForm from "../components/offers/SEOfferForm";
import { createOffer } from "../services/offerService";

function NewSEOffer() {
  return (
    <div>
      <div className="title">Create SEOffer</div>
      <SEOfferForm
        serviceOffer={createOffer}
        offer={EMPTY_OFFER_MODEL}
        action={"create"}
      />
    </div>
  );
}

export default NewSEOffer;
