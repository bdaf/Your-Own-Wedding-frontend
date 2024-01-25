import styles from "../../css/Form.module.css";
import { ChangeEvent, useContext, useEffect } from "react";
import { EventModel, NoteModel } from "../Models";
import FlashMessagesContext, {
  WARNING_FLASH_TYPE,
} from "../../store/flash-messages-context";
import { convertStringDateToProperForDateInput } from "../../helper";
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

  function onChangeStatusHandler(e: ChangeEvent<HTMLInputElement>): void {
    let status = "undone";
    if (e.target.checked) status = "done";
    setObject({
      ...currentObject,
      [e.target.name]: status,
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
            onChange={onChangeNameHandler}
            value={currentObject.name}
          />
        </div>
        {showNoteInsteadOfEventForm ? (
          <div className={styles.control}>
            <label htmlFor="body">Body</label>
            <textarea
              rows={15}
              id="body"
              required
              onChange={onChangeSecondAttribiuteHandler}
              value={(currentObject as NoteModel).body}
            />
            <div>
              <div className={styles.control}>
                <label
                  className={`${styles.container_chekbox}`}
                  htmlFor="status"
                >
                  <div className={`${styles.chekbox_text}`}>Done</div>
                  <input
                    type="checkbox"
                    id="status"
                    name="status"
                    onChange={onChangeStatusHandler}
                    checked={(currentObject as NoteModel).status == "done"}
                    // value={(currentObject as NoteModel).status == "done" ? true : false}
                  />{" "}
                  <span className={`${styles.checkmark}`}></span>
                </label>
              </div>
            </div>
          </div>
        ) : (
          <div className={styles.control}>
            <label htmlFor="date">Date</label>
            <input
              id="date"
              type="datetime-local"
              required
              onChange={onChangeSecondAttribiuteHandler}
              value={convertStringDateToProperForDateInput(
                (currentObject as EventModel).date
              )}
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
        <button className="btn-light-blue" onClick={createObjectOnClick}>
          Create
        </button>
        <button className="btn-update" onClick={editObjectOnClick}>
          Update
        </button>
        <button className="btn-red" onClick={deleteObjectOnClick}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default NoteNewForm;
