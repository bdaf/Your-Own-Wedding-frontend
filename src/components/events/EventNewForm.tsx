import styles from "../../css/Form.module.css";
import { RefObject, useRef } from "react";

function EventNewForm() {
  const nameInputRef: RefObject<HTMLInputElement> = useRef(null);
  const bodyInputRef: RefObject<HTMLTextAreaElement> = useRef(null);
  function submitHandler(): void {
    throw new Error("Function not implemented.");
  }

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={submitHandler}>
        <div className={styles.control}>
          <label htmlFor="name">Name</label>
          <input id="name" type="text" required ref={nameInputRef} />
        </div>
        <div className={styles.control}>
          <label htmlFor="body">Body</label>
          <textarea rows={15} id="body" required ref={bodyInputRef} />
        </div>
        <div className={styles.actions}>
          <button className="btn">Create</button>
        </div>
      </form>
    </div>
  );
}

export default EventNewForm;
