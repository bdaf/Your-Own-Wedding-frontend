import { shortStringTo } from "../../helper";
import { NoteModel } from "../Models";
import styles from "../eventsWithNotes/Event.module.css";

interface Props {
  note: NoteModel;
  permCharsNumber: number | undefined;
}

function NotesFromEvent({ note, permCharsNumber }: Props) {
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
    </div>
  );
}

export default NotesFromEvent;
