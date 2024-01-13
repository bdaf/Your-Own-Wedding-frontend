import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../components/ui/Card";
import EventNewForm from "../components/events/EventNewForm";
import {
  getAllEvents,
  createEvent,
  deleteEventById,
  editEvent,
} from "../services/eventService";
import FlashMessagesContext, {
  SUCCESS_FLASH_TYPE,
} from "../store/flash-messages-context";
import EventItem from "../components/events/EventItem";
import { EMPTY_EVENT_MODEL, EventModel } from "../components/Models";

function EventPage() {
  const navigate = useNavigate();
  const flashMsgCtx = useContext(FlashMessagesContext);
  const [loading, setLoading] = useState<boolean>(true);
  const [events, setEvents] = useState<EventModel[]>([]);
  const [currentEvent, setCurrentEvent] =
    useState<EventModel>(EMPTY_EVENT_MODEL);

  function setCurrentEventHandler(event: EventModel): void {
    console.log(event);
    setCurrentEvent(event);
  }

  useEffect(() => {
    setLoading(true);
    getAllEvents()
      .then((res) => {
        setEvents(res.data);
      })
      .catch((e) => {
        console.log(e);
        flashMsgCtx.handleError(e, navigate);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  function createEventHandler(event: EventModel): void {
    setCurrentEvent(event);
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
        flashMsgCtx.handleError(e, navigate);
      });
  }

  function editEventHandler(event: EventModel): void {
    setCurrentEvent(event);
    editEvent(event)
      .then((res) => {
        const editedEvent: EventModel = res.data;
        setEvents(
          events.map((e) => (e.id == editedEvent.id ? editedEvent : e))
        );
        flashMsgCtx.setFlashMessage(
          "Event has been updated",
          SUCCESS_FLASH_TYPE
        );
      })
      .catch((e) => {
        flashMsgCtx.handleError(e, navigate);
      });
  }

  function deleteEventHandler(event: EventModel): void {
    deleteEventById(String(event.id))
      .then((res) => {
        flashMsgCtx.handleSuccess(res);
        setEvents(events.filter((e) => e.id != event.id));
      })
      .catch((e) => {
        flashMsgCtx.handleError(e, navigate);
      });
  }

  if (loading) return <div className="title">Loading...</div>;
  return (
    <Card>
      <div className="content-left flex-wrap-2">
        <div className="width-80-center">
          <div className="title">Events</div>
          <EventNewForm
            currentEvent={currentEvent}
            setEvent={setCurrentEventHandler}
            onCreateHandler={createEventHandler}
            onDeleteHandler={deleteEventHandler}
            onEditHandler={editEventHandler}
          />
        </div>
        <div className="margin-left-0 width-20 scroll" style={{ margin: 0 }}>
          <div className="width-100-center">
            {events.map((e) => (
              <div key={e.id} onClick={() => setCurrentEventHandler(e)}>
                <EventItem
                  event={e}
                  eventColor={
                    e.id == currentEvent.id
                      ? "rgb(74, 213, 255)"
                      : "rgb(179, 233, 250)"
                  }
                  noteColor={"rgb(188, 188, 188)"}
                />
              </div>
            ))}
          </div>
        </div>
        <button
          onClick={() =>
            setCurrentEventHandler({
              name: "siema",
              id: 0,
              date: "",
            })
          }
        >
          Siema
        </button>
      </div>
    </Card>
  );
}

export default EventPage;
