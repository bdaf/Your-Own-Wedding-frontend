import Card from "../ui/Card";
import styles from "../eventsWithNotes/Event.module.css";
import { EventModel, NoteModel } from "../Models";
import NoteDetails from "./NoteDetails";
interface Props {
  event: EventModel;
  currentEvent: EventModel;
  currentNote: NoteModel;
  setCurrentNote: Function;
  setCurrentEvent: Function;
}

function EventItem({
  event,
  currentEvent,
  currentNote,
  setCurrentNote,
  setCurrentEvent,
}: Props) {
  return (
    <div className="pointer">
      <Card
        color={
          event.id == currentEvent.id
            ? "rgb(74, 213, 255)"
            : "rgb(179, 233, 250)"
        }
        border_radius={"0px"}
      >
        <div
          onClick={() => setCurrentEvent(event)}
          className={`${styles.event} ${styles.margin_auto}`}
        >
          <span className={styles.margin_auto}>
            {event.date.substring(0, 10)} {event.date.substring(11, 19)}
          </span>
          <b>{event.name}</b>
        </div>
      </Card>
      <div className="pointer">
        {event.notes.map((note: NoteModel) => (
          <div onClick={() => setCurrentNote(note)} key={note.id}>
            <Card
              color={
                note.id == currentNote.id
                  ? "rgb(150, 111, 111)"
                  : "rgb(190, 140, 140)"
              }
              border_radius="0"
            >
              <NoteDetails key={note.id} note={note} permCharsNumber={35} />
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EventItem;
