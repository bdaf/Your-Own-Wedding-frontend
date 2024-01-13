import styles from "../../css/Form.module.css";
import { ChangeEvent, RefObject, useEffect, useRef, useState } from "react";
import { EventModel } from "../Models";
interface Props {
  event: EventModel;
  setEvent: Function;
  onSubmitHandler: Function;
}
function EventNewForm({ event, setEvent, onSubmitHandler }: Props) {
  const nameInputRef: RefObject<HTMLInputElement> = useRef(null);
  const dateInputRef: RefObject<HTMLInputElement> = useRef(null);

  function submitHandler(e: any): void {
    e.preventDefault();
    const enteredName = nameInputRef.current!.value;
    const enteredDate = dateInputRef.current!.value;
    const eventToCreate: EventModel = {
      name: enteredName,
      date: enteredDate,
    };
    onSubmitHandler(eventToCreate);
  }

  useEffect(() => {}, []);

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={submitHandler}>
        <div className={styles.control}>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            required
            ref={nameInputRef}
            defaultValue={event.name}
          />
        </div>
        <div className={styles.control}>
          <label htmlFor="name">Date</label>
          <input
            id="name"
            type="date"
            required
            ref={dateInputRef}
            defaultValue={new Date().toLocaleDateString("en-CA")}
          />
        </div>
        {/* <div className={styles.control}>
          <label htmlFor="body">Body</label>
          <textarea
            rows={15}
            id="body"
            value={currentEvent.body}
            required
            onChange={handleBodyChange}
          />
        </div> */}
        <div className={styles.actions}>
          <button className="btn">Create</button>
          {/* <div className={styles.margin_auto}> */}
          <button className={styles.button_edit}>Edit</button>
          <button
            className={`btn-red`}
            onClick={() => {
              console.log("click");
            }}
          >
            Delete
          </button>
          {/* </div> */}
        </div>
      </form>
    </div>
  );
}

export default EventNewForm;
