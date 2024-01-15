import styles from "../../css/Form.module.css";
import { ChangeEvent, RefObject, useContext, useEffect, useRef } from "react";
import { EventModel, NoteModel } from "../Models";
import FlashMessagesContext, {
  WARNING_FLASH_TYPE,
} from "../../store/flash-messages-context";
interface Props {
  currentObject: NoteModel | EventModel;

  setObject: Function;
  onCreateHandler: Function;
  onDeleteHandler: Function;
  onEditHandler: Function;
  showNoteInsteadOfEventForm: boolean;
  setShowNoteInsteadOfEventForm: Function;
}
function NoteNewForm({
  currentObject,
  setObject,
  onCreateHandler,
  onDeleteHandler,
  onEditHandler,
  showNoteInsteadOfEventForm,
  setShowNoteInsteadOfEventForm,
}: Props) {
  const flashMsgCtx = useContext(FlashMessagesContext);
  const nameInputRef: RefObject<HTMLInputElement> = useRef(null);
  const secondAttribiiuteInputRef: RefObject<any> = useRef(null);

  function submitHandler(e: any): void {
    e.preventDefault();
  }

  useEffect(() => {}, []);

  const secondPropertiesName: string = showNoteInsteadOfEventForm
    ? "body"
    : "date";

  function onChangeNameHandler(e: ChangeEvent<HTMLInputElement>): void {
    setObject({
      ...currentObject,
      name: e.target.value,
    });
  }

  function onChangeSecondAttribiuteHandler(
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ): void {
    setObject({
      ...currentObject,
      [secondPropertiesName]: e.target.value,
    });
  }

  function createObjectOnClick() {
    onCreateHandler(currentObject);
  }
  function deleteObjectOnClick() {
    if (currentObject.id < 0) {
      flashMsgCtx.setFlashMessage(
        "You have to select event or note from list to delete it",
        WARNING_FLASH_TYPE
      );
    } else {
      onDeleteHandler(currentObject);
      currentObject.id = -1;
    }
  }

  function editObjectOnClick() {
    if (currentObject.id < 0) {
      flashMsgCtx.setFlashMessage(
        "You have to select event or note from list to edit",
        WARNING_FLASH_TYPE
      );
    } else {
      onEditHandler(currentObject);
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
            value={currentObject.name}
          />
        </div>
        {showNoteInsteadOfEventForm ? (
          <div className={styles.control}>
            <label htmlFor="name">Body</label>
            <textarea
              rows={15}
              id="body"
              required
              ref={secondAttribiiuteInputRef}
              onChange={onChangeSecondAttribiuteHandler}
              value={(currentObject as NoteModel).body}
            />
          </div>
        ) : (
          <div className={styles.control}>
            <label htmlFor="name">Date</label>
            <input
              id="date"
              type="datetime-local"
              required
              ref={secondAttribiiuteInputRef}
              onChange={onChangeSecondAttribiuteHandler}
              value={(currentObject as EventModel).date.split(".")[0]}
            />
          </div>
        )}
      </form>
      <div className={styles.actions}>
        <div className={styles.left_actions}>
          <button
            className="btn-dark-brown"
            onClick={() => setShowNoteInsteadOfEventForm(true)}
          >
            Note Form
          </button>

          <button
            className="btn-light-blue"
            onClick={() => setShowNoteInsteadOfEventForm(false)}
          >
            Event Form
          </button>
        </div>
        <button className="btn" onClick={createObjectOnClick}>
          Create
        </button>
        <button className="btn-dark-red" onClick={editObjectOnClick}>
          Edit
        </button>
        <button className="btn-red" onClick={deleteObjectOnClick}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default NoteNewForm;
