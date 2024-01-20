import { useNavigate, useParams } from "react-router-dom";
import { OFFERS } from "../constants";
import { useContext, useEffect, useState } from "react";
import styles from "../css/pages.module.css";
import { deleteOfferById, getOfferById } from "../services/offerService";
import FlashMessagesContext from "../store/flash-messages-context";
import { EMPTY_OFFER_MODEL, OfferModel } from "../components/Models";
import noImageFound from "../components/images/No Image Found.png";
import _300 from "../components/images/300.jpg";
import ImageGallery from "react-image-gallery";
import Card from "../components/ui/Card";

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
      <div className="width-100-center gap-1rem">
        <div className="title">{offer.title}</div>
        <div className={`${styles.gallery_container}`}>
          <Card customStyle="center">
            <div className={`${styles.gallery}`}>
              {!!offer.images.length ? (
                <ImageGallery
                  showPlayButton={false}
                  showNav={true}
                  items={offer.images.map(function (image) {
                    return { original: image, thumbnail: image };
                  })}
                />
              ) : (
                <img
                  src={noImageFound}
                  alt="PHOTO"
                  className={`${styles.image_not_found_gallery}`}
                />
              )}
            </div>
          </Card>
          <Card>
            <div
              className={`${styles.thumbs_container} ${styles.container}`}
            ></div>
          </Card>
        </div>
        <Card>
          <div className={`${styles.contact_container} ${styles.container}`}>
            Contact
          </div>
        </Card>
        <Card>
          <div
            className={`${styles.description_container}  ${styles.container}`}
          >
            {offer.address}
            {offer.description}
            {offer.created_at}
          </div>
        </Card>
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
