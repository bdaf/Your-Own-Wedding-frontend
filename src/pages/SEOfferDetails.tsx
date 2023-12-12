import { useNavigate, useParams } from "react-router-dom";
import { API_URL, SE_OFFERS } from "../constants";
import { useEffect, useState } from "react";
import styles from "./pages.module.css";

interface Offer {
  id?: number;
  title?: string;
  description?: string;
  address?: string;
  created_at?: any;
}

function SEOfferDetails() {
  const navigate = useNavigate();
  const [offer, setOffer] = useState<Offer>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const id = useParams().id;

  useEffect(() => {
    async function loadOffer() {
      try {
        const response = await fetch(`${API_URL}/offers/${id}`);
        if (response.ok) {
          const json = await response.json();
          setOffer(json);
        } else throw response;
      } catch (e) {
        setError("Error occurred...");
        console.log("Error occurred...", e);
      } finally {
        setLoading(false);
      }
    }
    loadOffer();
  }, []);

  if (loading) return <div className="title">Loading...</div>;
  if (error) return <h1 className="title">{error}</h1>;
  if (offer) {
    function backToSEOffersPageHandler(): void {
      navigate(`/${SE_OFFERS}`);
    }

    return (
      <div className="text-center">
        <div>
          <div className="title">SEOffer details</div>
          {offer.id}
          {offer.title}
          {offer.description}
          {offer.address}
          {offer.created_at}
        </div>
        <div>
          <button
            className={`btn-light ${styles.btn_light}`}
            onClick={backToSEOffersPageHandler}
          >
            Back to SE Offers
          </button>
        </div>
      </div>
    );
  }
}

export default SEOfferDetails;
