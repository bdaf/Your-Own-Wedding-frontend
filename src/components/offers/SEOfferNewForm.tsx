import { FormEvent, RefObject, useContext, useRef, useState } from "react";
import Card from "../ui/Card";

import styles from "../../css/Form.module.css";
import { useNavigate } from "react-router-dom";
import { createOffer } from "../../services/offerService";
import { OFFERS } from "../../constants";
import FlashMessagesContext, {
  SUCCESS_FLASH_TYPE,
} from "../../store/flash-messages-context";
import { OFFER_CATEGORY_OPTIONS } from "../Models";
import { upperCaseFirstStringCharacter } from "../../helper";

function NewSEOfferForm() {
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

    const formData = new FormData();
    formData.append("offer[title]", enteredTitle);
    formData.append("offer[address]", enteredAddress);
    formData.append("offer[description]", enteredDescription);
    formData.append("offer[category]", selectedCategory);
    formData.append("offer[prize]", enteredPrize);

    for (let i = 0; i < uploadedImages.length; i++) {
      formData.append("offer[images][]", uploadedImages[i]);
      console.log(uploadedImages[i]);
    }

    try {
      createOffer(formData)
        .then((response) => {
          console.log(response.data);
          flashMsgCtx.setFlashMessage(
            "Offer has been created",
            SUCCESS_FLASH_TYPE
          );
          navigate(`/${OFFERS}/${response.data.id}`);
        })
        .catch((err) => {
          flashMsgCtx.handleError(err, navigate);
          console.log(err);
        });
    } catch (e) {
      setError("Error occurred during creating offer.");
      console.log("Error occured: ", error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <div className="title">Loading...</div>;
  if (error) return <div className="title">{error}</div>;

  return (
    <div className={styles.container}>
      <Card>
        <form className={styles.form} onSubmit={submitHandler}>
          <div className={styles.control}>
            <label htmlFor="title">Title</label>
            <input id="title" type="text" required ref={titleInputRef} />
          </div>
          <div className={styles.control}>
            <label htmlFor="address">Address</label>
            <input id="address" type="text" required ref={addressInputRef} />
          </div>
          <div className={styles.control}>
            <label htmlFor="description">Description</label>
            <textarea
              rows={15}
              id="description"
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
              defaultValue={OFFER_CATEGORY_OPTIONS[0]}
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
              placeholder="0"
              className={styles.input}
              ref={prizeInputRef}
            />
            <span className={styles.span}>
              Typing prize 0 or leaving empty will cause not showing prize at
              all.
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

export default NewSEOfferForm;
