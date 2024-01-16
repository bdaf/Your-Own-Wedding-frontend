import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../components/ui/Card";
import {
  getMyEvents,
  createEvent,
  deleteEventById,
  editEvent,
} from "../services/eventService";
import FlashMessagesContext, {
  SUCCESS_FLASH_TYPE,
  WARNING_FLASH_TYPE,
} from "../store/flash-messages-context";
import EventItem from "../components/eventsWithNotes/EventItem";
import {
  EMPTY_EVENT_MODEL,
  EMPTY_NOTE_MODEL,
  EventModel,
  NoteModel,
  isProperId,
} from "../components/Models";
import NoteDetails from "../components/eventsWithNotes/NoteDetails";
import NoteNewForm from "../components/eventsWithNotes/EventAndNoteNewForm";
import {
  createNote,
  deleteNote,
  editNote,
  returnEventWithAddedNote,
  returnEventWithDeletedNote,
  returnEventWithEditedNote,
} from "../services/noteService";

function EventPage() {
  const navigate = useNavigate();
  const flashMsgCtx = useContext(FlashMessagesContext);
  const [loading, setLoading] = useState<boolean>(true);
  const [events, setEvents] = useState<EventModel[]>([]);
  const [showNoteInsteadOfEventForm, setShowNoteInsteadOfEventForm] =
    useState<boolean>(false);
  const [currentNote, setCurrentNote] = useState<NoteModel>(EMPTY_NOTE_MODEL);
  const [currentEvent, setCurrentEvent] =
    useState<EventModel>(EMPTY_EVENT_MODEL);

  function setCurrentEventHandler(event: EventModel): void {
    console.log(currentNote);
    setCurrentEvent(event);
    if (!isProperId(currentNote.event_id!)) {
      setCurrentNote({
        ...currentNote,
        event_id: event.id,
      });
    }

    setShowNoteInsteadOfEventForm(false);
  }

  function setCurrentNoteHandler(note: NoteModel): void {
    console.log(currentNote);
    console.log(note);
    setCurrentNote(note);
    setShowNoteInsteadOfEventForm(true);
  }

  useEffect(() => {
    setLoading(true);
    getMyEvents()
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
    console.log("createEventHandler");
    createEvent(event)
      .then((res) => {
        const newlyCreatedEvent: EventModel = res.data;
        setCurrentEvent(newlyCreatedEvent);
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
    console.log("editEventHandler");
    editEvent(event)
      .then((res) => {
        const editedEvent: EventModel = res.data;
        setEvents(
          events.map((e) => (e.id == editedEvent.id ? editedEvent : e))
        );
        setCurrentEvent(editedEvent);
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
    console.log("deleteEventHandler");
    deleteEventById(String(event.id))
      .then((res) => {
        flashMsgCtx.handleSuccess(res);
        setEvents(events.filter((e) => e.id != event.id));
      })
      .catch((e) => {
        flashMsgCtx.handleError(e, navigate);
      });
  }

  function createNoteHandler(note: NoteModel): void {
    console.log("createNoteHandler");
    if (!isProperId(currentEvent.id)) {
      flashMsgCtx.setFlashMessage(
        "You have to select event from list or create one to attach note to it",
        WARNING_FLASH_TYPE
      );
      return;
    }
    createNote(String(currentEvent.id), note)
      .then((res) => {
        const newlyCreatedNote: NoteModel = res.data;
        newlyCreatedNote.event_id = currentEvent.id;
        setCurrentNote(newlyCreatedNote);
        setEvents(
          events.map((e) =>
            e.id == currentEvent.id
              ? returnEventWithAddedNote(e, newlyCreatedNote)
              : e
          )
        );
        flashMsgCtx.setFlashMessage(
          "Note has been created",
          SUCCESS_FLASH_TYPE
        );
      })
      .catch((e) => {
        flashMsgCtx.handleError(e, navigate);
      });
  }

  function editNoteHandler(note: NoteModel): void {
    editNote(note)
      .then((res) => {
        const editedNote: NoteModel = res.data;
        editedNote.event_id = note.event_id;
        setCurrentNote(editedNote);
        setEvents(
          events.map((e) =>
            e.id == note.event_id ? returnEventWithEditedNote(e, editedNote) : e
          )
        );
        flashMsgCtx.setFlashMessage(
          "Note has been updated",
          SUCCESS_FLASH_TYPE
        );
      })
      .catch((e) => {
        flashMsgCtx.handleError(e, navigate);
      });
  }

  function deleteNoteHandler(noteToDelete: NoteModel): void {
    deleteNote(noteToDelete)
      .then((res: any) => {
        flashMsgCtx.handleSuccess(res);
        setEvents(
          events.map((e) =>
            e.id == noteToDelete.event_id
              ? returnEventWithDeletedNote(e, noteToDelete)
              : e
          )
        );
        setCurrentEventHandler(currentEvent);
      })
      .catch((e: any) => {
        flashMsgCtx.handleError(e, navigate);
      });
  }

  if (loading) return <div className="title">Loading...</div>;
  return (
    <Card>
      <div className="content-left flex-wrap-2">
        <div className="width-80-center">
          {showNoteInsteadOfEventForm && (
            <div className="margin-2rem">
              <Card color="rgb(150, 111, 111)" border_radius="0">
                <NoteDetails note={currentNote} permCharsNumber={undefined} />
              </Card>
            </div>
          )}
          {showNoteInsteadOfEventForm ? (
            <>
              <NoteNewForm
                currentObject={currentNote}
                setObject={setCurrentNoteHandler}
                onCreateHandler={createNoteHandler}
                onDeleteHandler={deleteNoteHandler}
                onEditHandler={editNoteHandler}
                showNoteInsteadOfEventForm={showNoteInsteadOfEventForm}
                setShowNoteInsteadOfEventForm={setShowNoteInsteadOfEventForm}
              />
            </>
          ) : (
            <>
              <div className="title">Event</div>
              <NoteNewForm
                currentObject={currentEvent}
                setObject={setCurrentEventHandler}
                onCreateHandler={createEventHandler}
                onDeleteHandler={deleteEventHandler}
                onEditHandler={editEventHandler}
                showNoteInsteadOfEventForm={showNoteInsteadOfEventForm}
                setShowNoteInsteadOfEventForm={setShowNoteInsteadOfEventForm}
              />
            </>
          )}
        </div>
        <div className="width-20 events-notes-container scroll-y">
          <div className="width-100-center">
            {events.map((e) => (
              <div key={e.id}>
                <EventItem
                  setCurrentNote={setCurrentNoteHandler}
                  setCurrentEvent={setCurrentEventHandler}
                  event={e}
                  currentEvent={currentEvent}
                  currentNote={currentNote}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}

export default EventPage;
