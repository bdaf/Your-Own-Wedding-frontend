import { useContext, useEffect } from "react";
import NewSEOfferForm from "../components/offers/SEOfferNewForm";
import AuthenticationContext from "../store/authentication-context";
import { SE_OFFERS } from "../constants";
import { useNavigate } from "react-router-dom";

function NewSEOffer() {
  const navigate = useNavigate();
  const authCtx = useContext(AuthenticationContext);

  useEffect(() => {
    if (!authCtx.isLoggedIn) {
      navigate(`${SE_OFFERS}`);
    }
  }, []);

  return (
    <div>
      <div className="title">Create SEOffer</div>
      <NewSEOfferForm />
    </div>
  );
}

export default NewSEOffer;
