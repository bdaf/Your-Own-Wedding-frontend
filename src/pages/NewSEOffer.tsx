import NewSEOfferForm from "../components/offers/NewSEOfferForm";
import { API_URL } from "../constants";

function NewSEOffer() {
  return (
    <div className="width-80-center">
      <div className="title">Create SEOffer</div>
      <NewSEOfferForm />
    </div>
  );
}

export default NewSEOffer;
