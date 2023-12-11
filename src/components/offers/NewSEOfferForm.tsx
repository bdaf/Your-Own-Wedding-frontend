import { FormEvent } from "react";
import Card from "../ui/Card";

import styles from "./NewSEOfferForm.module.css";
function NewSEOfferForm() {
  function submitHandler(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
  }

  return (
    <Card>
      <form className={styles.form} onSubmit={submitHandler}>
        <div className={styles.control}>
          <label htmlFor="title">Title</label>
          <input id="title" type="text" required></input>
        </div>
        <div className={styles.control}>
          <label htmlFor="address">Address</label>
          <input id="address" type="text" required></input>
        </div>
        <div className={styles.control}>
          <label htmlFor="description">Description</label>
          <textarea id="description" required></textarea>
        </div>
        <div className={styles.actions}>
          <button>Create</button>
        </div>
      </form>
    </Card>
  );
}

export default NewSEOfferForm;
