import { FormEvent, RefObject, createRef, useRef } from "react";
import Card from "../ui/Card";

import styles from "./NewSEOfferForm.module.css";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../constants";

function NewSEOfferForm() {
  const navigate = useNavigate();
  const titleInputRef: RefObject<HTMLInputElement> = useRef(null);
  const addressInputRef: RefObject<HTMLInputElement> = useRef(null);
  const descriptionInputRef: RefObject<HTMLTextAreaElement> = useRef(null);

  async function submitHandler(
    event: FormEvent<HTMLFormElement>
  ): Promise<void> {
    event.preventDefault();

    const enteredTitle = titleInputRef.current?.value;
    const enteredAddress = addressInputRef.current?.value;
    const enteredDescription = descriptionInputRef.current?.value;

    const offer = {
      title: enteredTitle,
      address: enteredAddress,
      description: enteredDescription,
    };

    const response = await fetch(`${API_URL}/offers`, {
      method: "POST",
      body: JSON.stringify(offer),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      const offer = await response.json();
      navigate(`/se-offers/${offer.id}}`);
    } else {
      console.log("Error occured. Status: ", response.status);
    }
  }

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
          <div className={styles.actions}>
            <button className="btn">Create</button>
          </div>
        </form>
      </Card>
    </div>
  );
}

export default NewSEOfferForm;
