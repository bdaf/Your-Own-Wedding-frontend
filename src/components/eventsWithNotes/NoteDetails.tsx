import {
  getOnlyDateAndHourFromDateInString,
  shortStringTo,
} from "../../helper";
import { NoteModel } from "../Models";
import styles from "../eventsWithNotes/Event.module.css";

interface Props {
  note: NoteModel;
  permCharsNumber: number | undefined;
  timestamps?: boolean;
}

function NotesFromEvent({ note, permCharsNumber, timestamps }: Props) {
  return (
    <div
      className={`${styles.note} ${styles.margin_auto} max-200-height scroll-y`}
    >
      <div className={styles.note_name}>
        {shortStringTo(permCharsNumber, note.name)}
      </div>
      <hr></hr>
      <div className={styles.note_body}>
        {shortStringTo(permCharsNumber, note.body)}
      </div>
      {timestamps && (
        <div className={`${styles.note_timestamps} space-between`}>
          <div>
            <b>Updated at:</b>{" "}
            {getOnlyDateAndHourFromDateInString(note.updated_at!)}
          </div>
          <div>
            <b>Created at:</b>{" "}
            {getOnlyDateAndHourFromDateInString(note.created_at!)}
          </div>
        </div>
      )}
    </div>
  );
}

export default NotesFromEvent;
