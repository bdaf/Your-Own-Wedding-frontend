import { MouseEventHandler, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthenticationContext from "../store/authentication-context";
import { LOGIN } from "../constants";
import Card from "../components/ui/Card";
import EventNewForm from "../components/events/EventNewForm";
import { getAllEvents, createEvent } from "../services/eventService";
import FlashMessagesContext, {
  SUCCESS_FLASH_TYPE,
} from "../store/flash-messages-context";
import EventItem from "../components/events/EventItem";
import { EventModel, NoteModel } from "../components/Models";

function EventPage() {
  const navigate = useNavigate();
  const authCtx = useContext(AuthenticationContext);
  const flashMsgCtx = useContext(FlashMessagesContext);
  const [loading, setLoading] = useState<boolean>(true);
  const [events, setEvents] = useState<EventModel[]>([]);
  const [currentEvent, setCurrentEvent] = useState({});
  const [currentNote, setCurrentNote] = useState({});
  const [isNoteNotEvent, setIsNoteNotEvent] = useState(false);

  function setEvent(event: EventModel): void {
    setCurrentEvent(event);
  }

  function createEventHandler(event: EventModel): void {
    setLoading(true);
    createEvent(event)
      .then((res) => {
        const newlyCreatedEvent: EventModel = res.data;
        console.log(events);
        setEvents([...events, newlyCreatedEvent]);
        flashMsgCtx.setFlashMessage(
          "Event has been created",
          SUCCESS_FLASH_TYPE
        );
      })
      .catch((e) => {
        flashMsgCtx.handleError(e);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function setNote(note: NoteModel): void {
    setCurrentNote(note);
  }

  useEffect(() => {
    authCtx.updateAuthentication();
    if (!authCtx.isLoggedIn()) {
      navigate(`/${LOGIN}`);
      flashMsgCtx.handleNotAuthenticated();
      return;
    }
    setLoading(true);
    getAllEvents()
      .then((res) => {
        setEvents(res.data);
        if (res.data.length > 0) {
          setCurrentEvent(res.data[0]);
        }
      })
      .catch((e) => {
        console.log(e);
        flashMsgCtx.handleError(e);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  function selectEventHandler(event: EventModel): void {
    setCurrentEvent(event);
  }

  if (loading) return <div className="title">Loading...</div>;
  return (
    <Card>
      <div className="content-left flex-wrap-2">
        <div className="width-80-center">
          <div className="title">Events</div>
          <EventNewForm
            event={currentEvent}
            setEvent={setEvent}
            onSubmitHandler={createEventHandler}
          />
        </div>
        <div className="margin-left-0 width-20 scroll" style={{ margin: 0 }}>
          <div className="width-100-center">
            {events.map((e) => (
              <div key={e.id} onClick={() => selectEventHandler(e)}>
                <EventItem event={e} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}

export default EventPage;
