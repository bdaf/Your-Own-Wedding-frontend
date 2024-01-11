import EventItem from "./EventItem";

interface Props {
  events: any[];
}

function EventsList({ events }: Props) {
  console.log(events);
  return (
    <div className="center">
      {events.map((e) => (
        <EventItem event={e} key={e.id} />
      ))}
    </div>
  );
}

export default EventsList;
