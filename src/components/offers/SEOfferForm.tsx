import { FormEvent, RefObject, useContext, useRef, useState } from "react";
import { AxiosError } from "axios";
import Card from "../ui/Card";

import styles from "../../css/Form.module.css";
import { useNavigate } from "react-router-dom";
import { OFFERS } from "../../constants";
import FlashMessagesContext, {
  SUCCESS_FLASH_TYPE,
} from "../../store/flash-messages-context";
import {
  OFFER_ADDRESS_KEY,
  OFFER_CATEGORY_KEY,
  OFFER_CATEGORY_OPTIONS,
  OFFER_DESCRIPTION_KEY,
  OFFER_ID_KEY,
  OFFER_IMAGES_KEY,
  OFFER_PRIZE_KEY,
  OFFER_TITLE_KEY,
  OfferApiResponse,
  OfferModel,
} from "../Models";
import { upperCaseFirstStringCharacter } from "../../helper";

interface Props {
  serviceOffer: Function;
  offer_id?: string;
  offer: OfferModel;
  action: string;
}

function SEOfferForm({ serviceOffer, offer_id, offer, action }: Props) {
  const navigate = useNavigate();
  const flashMsgCtx = useContext(FlashMessagesContext);
  const titleInputRef: RefObject<HTMLInputElement> = useRef(null);
  const descriptionInputRef: RefObject<HTMLTextAreaElement> = useRef(null);
  const imagesInputRef: RefObject<HTMLInputElement> = useRef(null);
  const addressInputRef: RefObject<HTMLInputElement> = useRef(null);
  const categoryInputRef: RefObject<HTMLSelectElement> = useRef(null);
  const prizeInputRef: RefObject<HTMLInputElement> = useRef(null);

  const [loading, setLoading] = useState(false);

  async function submitHandler(
    event: FormEvent<HTMLFormElement>
  ): Promise<void> {
    event.preventDefault();
    setLoading(true);

    const uploadedImages = imagesInputRef.current?.files!;
    const enteredTitle = titleInputRef.current?.value!;
    const enteredAddress = addressInputRef.current?.value!;
    const enteredDescription = descriptionInputRef.current?.value!;
    const selectedCategory = categoryInputRef.current?.value!;
    const enteredPrize = prizeInputRef.current?.value!;

    const formData = new FormData();
    if (offer_id != null) {
      formData.append(OFFER_ID_KEY, String(offer_id));
    }
    formData.append(OFFER_TITLE_KEY, enteredTitle);
    formData.append(OFFER_ADDRESS_KEY, enteredAddress);
    formData.append(OFFER_DESCRIPTION_KEY, enteredDescription);
    formData.append(OFFER_CATEGORY_KEY, selectedCategory);
    formData.append(OFFER_PRIZE_KEY, enteredPrize);

    for (let i = 0; i < uploadedImages.length; i++) {
      formData.append(OFFER_IMAGES_KEY, uploadedImages[i]);
    }

    serviceOffer(formData)
      .then((response: OfferApiResponse) => {
        flashMsgCtx.setFlashMessage(
          `Offer has been ${action}d`,
          SUCCESS_FLASH_TYPE
        );
        navigate(`/${OFFERS}/${response.data.id}`);
      })
      .catch((err: AxiosError) => {
        flashMsgCtx.handleError(err, navigate);
        console.log(err);
      })
      .finally(() => setLoading(false));
  }

  if (loading) return <div className="title">Loading...</div>;

  return (
    <div className={styles.container}>
      <Card>
        <form className={styles.form} onSubmit={submitHandler}>
          <div className={styles.control}>
            <label htmlFor="title">Title</label>
            <input
              id="title"
              type="text"
              defaultValue={offer.title}
              required
              ref={titleInputRef}
            />
          </div>
          <div className={styles.control}>
            <label htmlFor="address">Address</label>
            <input
              id="address"
              type="text"
              defaultValue={offer.address}
              required
              ref={addressInputRef}
            />
          </div>
          <div className={styles.control}>
            <label htmlFor="description">Description</label>
            <textarea
              rows={15}
              id="description"
              defaultValue={offer.description}
              required
              ref={descriptionInputRef}
            />
          </div>
          <div className={styles.control}>
            <label htmlFor="images">Images</label>
            <input
              type="file"
              name="images"
              multiple
              ref={imagesInputRef}
              accept=".png,.jpg,jpeg"
            ></input>
            <span className={styles.caption}>
              Every time set whole set of pictures you want to upload - max 10
              pictures.
            </span>
          </div>

          <div className={styles.control}>
            <label htmlFor="category">Category</label>
            <select
              id="category"
              name="category"
              ref={categoryInputRef}
              defaultValue={offer.category}
            >
              {OFFER_CATEGORY_OPTIONS.map((category, index) => (
                <option key={index} value={category}>
                  {upperCaseFirstStringCharacter(category)}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.control}>
            <label htmlFor="prize">Prize</label>
            <input
              id="prize"
              type="text"
              defaultValue={offer.prize}
              placeholder="0"
              className={styles.input}
              ref={prizeInputRef}
            />
            <span className={styles.caption}>
              Typing prize 0 or leaving field empty will cause not showing prize
              at all.
            </span>
          </div>
          <div className={styles.actions}>
            <button className={`btn-` + action}>
              {upperCaseFirstStringCharacter(action)}
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
}

export default SEOfferForm;
