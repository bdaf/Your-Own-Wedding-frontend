import { useNavigate, useParams } from "react-router-dom";
import { OFFERS } from "../constants";
import { useContext, useEffect, useState } from "react";
import styles from "../css/pages.module.css";
import { deleteOfferById, getOfferById } from "../services/offerService";
import FlashMessagesContext from "../store/flash-messages-context";
import { EMPTY_OFFER_MODEL, OfferModel } from "../components/Models";
import ImageGallery from "react-image-gallery";

function SEOfferDetails() {
  const navigate = useNavigate();
  const flashMsgCtx = useContext(FlashMessagesContext);
  const [offer, setOffer] = useState<OfferModel>(EMPTY_OFFER_MODEL);
  const [loading, setLoading] = useState(true);
  const id = useParams().id!;

  useEffect(() => {
    setLoading(true);
    async function loadOffer() {
      try {
        const response = await getOfferById(id);
        setOffer(response.data);
      } catch (e) {
        flashMsgCtx.handleError(e, navigate);
        console.log("Error occurred during loading offer.", e);
      } finally {
        setLoading(false);
      }
    }
    loadOffer();
  }, []);

  function deleteOfferHandler(): void {
    setLoading(true);
    deleteOfferById(id)
      .then((res) => {
        navigate(`/${OFFERS}`);
        flashMsgCtx.handleSuccess(res);
      })
      .catch((e) => {
        flashMsgCtx.handleError(e, navigate);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  if (loading) return <div className="title">Loading...</div>;
  if (offer) {
    function backToSEOffersPageHandler(): void {
      navigate(`/${OFFERS}`);
    }

    return (
      <div className="text-center">
        <div>
          <div className="title">SEOffer details</div>
          <ImageGallery
            items={offer.images.map(function (image) {
              return { original: image, thumbnail: "" };
            })}
          />
          <ul>
            <li>{offer.id}</li>
            <li>{offer.title}</li>
            <li>{offer.images}</li>
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
  return (
    <div className="title">
      Critical error occurred, we're sorry for inconvienience.
    </div>
  );
}

export default SEOfferDetails;
