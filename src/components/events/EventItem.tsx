interface Props {
  event: any;
}

function EventItem({ event }: Props) {
  return (
    <div>
      {event.name} - {event.date} <br></br>
      Notes: <br></br>
      {event.notes.map((note: any) => (
        <>
          <h2>{note.name}</h2>
          <span>{note.body}</span>
        </>
      ))}
    </div>
  );
}

export default EventItem;
