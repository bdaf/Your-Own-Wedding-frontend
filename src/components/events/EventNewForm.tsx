import styles from "../../css/Form.module.css";
import {
  ChangeEvent,
  RefObject,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { EventModel } from "../Models";
import FlashMessagesContext, {
  WARNING_FLASH_TYPE,
} from "../../store/flash-messages-context";
interface Props {
  currentEvent: EventModel;
  setEvent: Function;
  onCreateHandler: Function;
  onDeleteHandler: Function;
  onEditHandler: Function;
}
function EventNewForm({
  currentEvent,
  setEvent,
  onCreateHandler,
  onDeleteHandler,
  onEditHandler,
}: Props) {
  const flashMsgCtx = useContext(FlashMessagesContext);
  const nameInputRef: RefObject<HTMLInputElement> = useRef(null);
  const dateInputRef: RefObject<HTMLInputElement> = useRef(null);

  function submitHandler(e: any): void {
    e.preventDefault();
  }

  useEffect(() => {
    console.log(currentEvent);
  }, []);

  function onChangeNameHandler(e: ChangeEvent<HTMLInputElement>): void {
    setEvent({
      id: currentEvent.id,
      name: e.target.value,
      date: dateInputRef.current?.value,
    });
  }

  function onChangeDateHandler(e: ChangeEvent<HTMLInputElement>): void {
    setEvent({
      id: currentEvent.id,
      name: nameInputRef.current?.value,
      date: e.target.value,
    });
  }

  function createEventOnClick() {
    onCreateHandler(currentEvent);
  }
  function deleteEventOnClick() {
    if (currentEvent.id < 0) {
      flashMsgCtx.setFlashMessage(
        "You have to select event from list to delete it",
        WARNING_FLASH_TYPE
      );
    } else {
      onDeleteHandler(currentEvent);
      currentEvent.id = -1;
    }
  }
  function editEventOnClick() {
    if (currentEvent.id < 0) {
      flashMsgCtx.setFlashMessage(
        "You have to select event from list to edit",
        WARNING_FLASH_TYPE
      );
    } else {
      onEditHandler(currentEvent);
      currentEvent.id = -1;
    }
  }

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
            onChange={onChangeNameHandler}
            value={currentEvent.name}
          />
        </div>
        <div className={styles.control}>
          <label htmlFor="name">Date</label>
          <input
            id="name"
            type="datetime-local"
            required
            ref={dateInputRef}
            onChange={onChangeDateHandler}
            // defaultValue={currentEvent.date}
            value={currentEvent.date!.split(".")[0]}
            // value={new Date(currentEvent.date!).toISOString()}
            // defaultValue={new Date().toLocaleDateString("en-CA")}
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
          <button className="btn" onClick={createEventOnClick}>
            Create
          </button>
          {/* <div className={styles.margin_auto}> */}
          <button className="btn-dark-red" onClick={editEventOnClick}>
            Edit
          </button>
          <button className="btn-red" onClick={deleteEventOnClick}>
            Delete
          </button>
          {/* </div> */}
        </div>
      </form>
    </div>
  );
}

export default EventNewForm;
