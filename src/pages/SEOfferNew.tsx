import { EMPTY_OFFER_MODEL } from "../components/Models";
import SEOfferForm from "../components/offers/SEOfferForm";
import { createOffer } from "../services/offerService";

function NewSEOffer() {
  const formData = new FormData();

  return (
    <div>
      <div className="title">Create SEOffer</div>
      <SEOfferForm
        serviceOffer={createOffer}
        formData={formData}
        offer={EMPTY_OFFER_MODEL}
      />
    </div>
  );
}

export default NewSEOffer;
