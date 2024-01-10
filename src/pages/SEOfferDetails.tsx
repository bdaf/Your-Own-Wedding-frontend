import { useNavigate, useParams } from "react-router-dom";
import { SE_OFFERS } from "../constants";
import { useEffect, useState } from "react";
import styles from "./pages.module.css";
import { deleteOfferById, getOfferById } from "../services/offerService";

interface Offer {
  id?: number;
  title?: string;
  description?: string;
  address?: string;
  images?: [];
  created_at?: any;
}

function SEOfferDetails() {
  const navigate = useNavigate();
  const [offer, setOffer] = useState<Offer>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const id = useParams().id!;

  useEffect(() => {
    async function loadOffer() {
      try {
        const response = await getOfferById(id);
        setOffer(response.data);
      } catch (e) {
        setError(
          "Error occurred during loading offer. Please try again later."
        );
        console.log("Error occurred during loading offer.", e);
      } finally {
        setLoading(false);
      }
    }
    loadOffer();
  }, []);

  function deleteOfferHandler(): void {
    try {
      deleteOfferById(id);
      navigate(`/${SE_OFFERS}`);
    } catch (e) {
      setError("Error occurred during deleting offer. Please try again later.");
      console.log("Error occurred during deleting offer.", e);
    } finally {
      setLoading(false);
    }
  }

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
          {offer.images?.map((image) => {
            return <img src={image} alt="PHOTO" width={"500px"} />;
          })}
          <ul>
            <li>{offer.id}</li>
            <li>{offer.title}</li>
            <li>{offer.description}</li>
            <li>{offer.address}</li>
            <li>{offer.created_at}</li>
          </ul>
        </div>
        <div>
          <button className={`btn-red`} onClick={deleteOfferHandler}>
            Delete
          </button>
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
