import Card from "../ui/Card";
import styles from "../events/Event.module.css";
interface Props {
  event: any;
  // create: any;
}

function EventItem({ event }: Props) {
  function deleteEventHandler(): void {}

  return (
    <div>
      <Card color="rgb(179, 233, 250)" border_radius={"0px"}>
        <div className={`${styles.event} ${styles.margin_auto}`}>
          <span className={styles.margin_auto}>
            {event.date.substring(0, 10)} {event.date.substring(11, 19)}
          </span>
          <b>{event.name}</b>
        </div>
      </Card>
      {event.notes.map((note: any) => (
        <Card color="rgb(188, 188, 188)" border_radius={"2px"} key={note.id}>
          <div className={`${styles.note} ${styles.margin_auto}`}>
            <div className={styles.note_name}>{note.name}</div>
            <hr></hr>
            <div className={styles.note_body}>{note.body}</div>
          </div>
        </Card>
      ))}
    </div>
  );
}

export default EventItem;
