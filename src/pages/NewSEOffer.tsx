import NewSEOfferForm from "../components/offers/NewSEOfferForm";

function NewSEOffer() {
  console.log("Ładuje");
  return (
    <div className="width-80-center">
      <div className="title">Create SEOffer</div>
      <NewSEOfferForm />
    </div>
  );
}

export default NewSEOffer;
