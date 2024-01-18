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
  OFFER_CATEGORY_OPTIONS,
  OfferApiResponse,
  OfferModel,
} from "../Models";
import { upperCaseFirstStringCharacter } from "../../helper";

interface Props {
  serviceOffer: Function;
  formData: FormData;
  offer: OfferModel;
}

function SEOfferForm({ serviceOffer, formData, offer }: Props) {
  const navigate = useNavigate();
  const flashMsgCtx = useContext(FlashMessagesContext);
  const titleInputRef: RefObject<HTMLInputElement> = useRef(null);
  const descriptionInputRef: RefObject<HTMLTextAreaElement> = useRef(null);
  const imagesInputRef: RefObject<HTMLInputElement> = useRef(null);
  const addressInputRef: RefObject<HTMLInputElement> = useRef(null);
  const categoryInputRef: RefObject<HTMLSelectElement> = useRef(null);
  const prizeInputRef: RefObject<HTMLInputElement> = useRef(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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

    formData.append("offer[title]", enteredTitle);
    formData.append("offer[address]", enteredAddress);
    formData.append("offer[description]", enteredDescription);
    formData.append("offer[category]", selectedCategory);
    formData.append("offer[prize]", enteredPrize);

    // for (let i = 0; i < uploadedImages.length; i++) {
    //   formData.append("offer[images][]", uploadedImages[i]);
    //   console.log(uploadedImages[i]);
    // }

    serviceOffer(formData)
      .then((response: OfferApiResponse) => {
        console.log(response.data);
        flashMsgCtx.setFlashMessage(
          "Offer has been created",
          SUCCESS_FLASH_TYPE
        );
        navigate(`/${OFFERS}/${response.data.id}`);
      })
      .catch((err: AxiosError) => {
        flashMsgCtx.handleError(err, navigate);
        setError("Error occurred during creating offer.");
        console.log(err);
      })
      .finally(() => setLoading(false));
  }

  if (loading) return <div className="title">Loading...</div>;
  if (error) return <div className="title">{error}</div>;

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
          <input
            type="file"
            name="image"
            className={styles.choose_file_input}
            multiple
            ref={imagesInputRef}
          ></input>
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
            <span className={styles.span}>
              Typing prize 0 or leaving field empty will cause not showing prize
              at all.
            </span>
          </div>
          <div className={styles.actions}>
            <button className="btn">Create</button>
          </div>
        </form>
      </Card>
    </div>
  );
}

export default SEOfferForm;
