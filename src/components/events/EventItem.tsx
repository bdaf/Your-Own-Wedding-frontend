import Card from "../ui/Card";
import styles from "../events/Event.module.css";
interface Props {
  event: any;
}

function EventItem({ event }: Props) {
  function deleteEventHandler(): void {
    throw new Error("Function not implemented.");
  }
  console.log(event.date.length);

  return (
    <div className="width-100-center">
      <Card color="light_blue">
        <div className={`${styles.event} ${styles.margin_auto}`}>
          <span className={styles.margin_auto}>
            {event.date.substring(0, 10)} <br></br>
            {event.date.substring(11, 19)}
          </span>
          <h3 className={styles.margin_auto}>{event.name}</h3>
          <div className={styles.margin_auto}>
            <button className={styles.button_edit}>Edit</button>
            <button className={`btn-red`} onClick={deleteEventHandler}>
              Delete
            </button>
          </div>
        </div>
      </Card>
      <Card color="grey">
        {event.notes.map((note: any) => (
          <div>
            <div className={styles.note_name}>{note.name}</div>
            <div className={styles.note_body}>{note.body}</div>
            <hr></hr>
          </div>
        ))}
      </Card>
    </div>
  );
}

export default EventItem;
