import { useParams } from "react-router-dom";
import { API_URL } from "../constants";
import { useEffect, useState } from "react";

interface Offer {
  id?: number;
  title?: string;
  description?: string;
  address?: string;
  created_at?: any;
}

function SEOfferDetails() {
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
  }, [offer]);

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>{error}</h1>;
  if (offer) {
    return (
      <div>
        <h2>SEOfferDetails</h2>
        {offer.id}
        {offer.title}
        {offer.description}
        {offer.address}
        {offer.created_at}
      </div>
    );
  }
}

export default SEOfferDetails;
