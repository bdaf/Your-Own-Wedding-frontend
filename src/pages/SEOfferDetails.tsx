import { useNavigate, useParams } from "react-router-dom";
import { OFFERS } from "../constants";
import { useContext, useEffect, useState } from "react";
import styles from "../css/pages.module.css";
import {
  deleteOfferById,
  getOfferById,
  getOfferContactByOfferId,
} from "../services/offerService";
import FlashMessagesContext, {
  SUCCESS_FLASH_TYPE,
} from "../store/flash-messages-context";
import {
  EMPTY_OFFER_MODEL,
  OFFER_EMPTY_CONTACT_DATA,
  OfferContactModel,
  OfferModel,
} from "../components/Models";
import _300 from "../components/images/300.jpg";
import ImageGallery from "react-image-gallery";
import Card from "../components/ui/Card";
import {
  getOnlyDateAndHourFromDateInString,
  upperCaseFirstStringCharacter,
} from "../helper";
import AuthenticationContext from "../store/authentication-context";

function SEOfferDetails() {
  const navigate = useNavigate();
  const flashMsgCtx = useContext(FlashMessagesContext);
  const authCtx = useContext(AuthenticationContext);
  const [offer, setOffer] = useState<OfferModel>(EMPTY_OFFER_MODEL);
  const [loading, setLoading] = useState(true);
  const [loadingContact, setLoadingContact] = useState(false);
  const [contactData, setContactData] = useState<OfferContactModel>(
    OFFER_EMPTY_CONTACT_DATA
  );
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

  function editButtonHandler(): void {
    navigate(`/${OFFERS}/${id.toString()}/edit`);
  }

  function backToSEOffersPageHandler(): void {
    navigate(`/${OFFERS}`);
  }

  function showContactHandler(): void {
    setLoadingContact(true);
    getOfferContactByOfferId(id)
      .then((res) => {
        console.log(res);
        setContactData(res.data);
        flashMsgCtx.setFlashMessage(
          "Contact has been shown",
          SUCCESS_FLASH_TYPE
        );
      })
      .catch((e) => {
        flashMsgCtx.handleError(e, navigate);
      })
      .finally(() => {
        setLoadingContact(false);
      });
  }

  if (loading) return <div className="title">Loading...</div>;
  if (offer) {
    return (
      <div>
        <div className="title">{offer.title}</div>
        {!!offer.images.length && (
          <div className={`${styles.gallery_container}`}>
            <Card customStyle="center">
              <div className={`${styles.gallery}`}>
                <ImageGallery
                  showPlayButton={false}
                  showNav={true}
                  items={offer.images.map(function (image) {
                    return { original: image, thumbnail: image };
                  })}
                />
              </div>
            </Card>
            <Card>
              <div
                className={`${styles.thumbs_container} ${styles.container}`}
              ></div>
            </Card>
          </div>
        )}
        <Card>
          <div className={`${styles.container}`}>
            <div className="center">
              <b>Contact</b>
            </div>
            {loadingContact ? (
              <div className="title">Loading...</div>
            ) : !!contactData.user.email ? (
              <div className={`${styles.contact_container}`}>
                <div className={`${styles.contact_sub_container}`}>
                  <div className={`${styles.contact}`}>
                    <b>Email address: </b>
                    {` ${contactData.user.email}`}
                  </div>
                  <div className={`${styles.contact}`}>
                    <b>User address:</b>
                    {` ${contactData.user.address}`}
                  </div>
                </div>
                <div className={`${styles.contact_sub_container}`}>
                  <div className={`${styles.contact}`}>
                    <b>Phone number:</b>
                    {` ${contactData.user.phone_number}`}
                  </div>
                  <div className={`${styles.contact}`}>
                    <b>Offer address:</b>
                    {` ${contactData.offer.address}`}
                  </div>
                </div>
              </div>
            ) : (
              <div className="center">
                {" "}
                <button
                  className={`${styles.show_contact_button} btn`}
                  onClick={showContactHandler}
                >
                  Show contact
                </button>
              </div>
            )}
          </div>
        </Card>
        <Card>
          <div
            className={`${styles.description_container}  ${styles.container}`}
          >
            <div className="title">{offer.title}</div>
            <div className={`${styles.sub_container}`}>
              <div className={`${styles.contact}`}>
                <b>Category:</b>
                {` ${upperCaseFirstStringCharacter(offer.category)}`}
              </div>
              <div className={`${styles.contact}`}>
                <b>Prize:</b>
                {` ${offer.prize}`} PLN
              </div>
            </div>
            <div className={`${styles.description}`}>{offer.description}</div>
            <div className="center">
              <b>{`Published: ${getOnlyDateAndHourFromDateInString(
                offer.created_at!
              )}`}</b>
            </div>
          </div>
        </Card>
        <div className="actions">
          {authCtx.isSupportUser() &&
            authCtx.getCurrentUser().id == offer.user_id && (
              <>
                <button className={`btn-red`} onClick={deleteOfferHandler}>
                  Delete
                </button>
                <button className={`btn-update`} onClick={editButtonHandler}>
                  Edit
                </button>
              </>
            )}
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
  return <div className="title">Error occurred during loading offer.</div>;
}

export default SEOfferDetails;
