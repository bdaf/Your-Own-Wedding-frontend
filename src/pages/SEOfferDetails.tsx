import { useNavigate, useParams } from "react-router-dom";
import { OFFERS } from "../constants";
import { useContext, useEffect, useState } from "react";
import styles from "../css/pages.module.css";
import { deleteOfferById, getOfferById } from "../services/offerService";
import FlashMessagesContext, {
  ERROR_FLASH_TYPE,
} from "../store/flash-messages-context";

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
  const flashMsgCtx = useContext(FlashMessagesContext);
  const [offer, setOffer] = useState<Offer>({});
  const [loading, setLoading] = useState(true);
  const id = useParams().id!;

  useEffect(() => {
    async function loadOffer() {
      try {
        const response = await getOfferById(id);
        setOffer(response.data);
      } catch (e) {
        flashMsgCtx.setFlashMessage(
          "Error occurred during loading offer.",
          ERROR_FLASH_TYPE
        );
        console.log("Error occurred during loading offer.", e);
      } finally {
        setLoading(false);
      }
    }
    loadOffer();
  }, []);

  function deleteOfferHandler(): void {
    deleteOfferById(id)
      .then((res) => {
        navigate(`/${OFFERS}`);
        flashMsgCtx.handleSuccessOrErrorMessageFromResponse(res);
      })
      .catch((e) => {
        flashMsgCtx.setFlashMessage(
          "Error occurred during deleting offer.",
          ERROR_FLASH_TYPE
        );
        console.log("Error occurred during deleting offer.", e);
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
          {offer.images?.map((image, index) => {
            return <img key={index} src={image} alt="PHOTO" width={"500px"} />;
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
  return (
    <div className="title">
      Critical error occurred, we're sorry for inconvienience.
    </div>
  );
}

export default SEOfferDetails;
