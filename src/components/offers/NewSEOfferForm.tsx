import { FormEvent } from "react";
import Card from "../ui/Card";

import styles from "./NewSEOfferForm.module.css";
function NewSEOfferForm() {
  function submitHandler(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
  }

  return (
    <div className={styles.container}>
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
            <textarea rows={15} id="description" required></textarea>
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
