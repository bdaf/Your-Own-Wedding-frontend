import { useContext, useEffect } from "react";
import NewSEOfferForm from "../components/offers/SEOfferNewForm";
import AuthenticationContext from "../store/authentication-context";
import { OFFERS } from "../constants";
import { useNavigate } from "react-router-dom";

function EditSEOffer() {
  const navigate = useNavigate();
  const authCtx = useContext(AuthenticationContext);

  useEffect(() => {
    if (!authCtx.isSupportUser()) {
      navigate(`${OFFERS}`);
    }
  }, []);

  return (
    <div>
      <div className="title">Edit SEOffer</div>
      <NewSEOfferForm />
    </div>
  );
}

export default EditSEOffer;
