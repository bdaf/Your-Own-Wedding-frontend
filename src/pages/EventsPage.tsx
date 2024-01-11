import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthenticationContext from "../store/authentication-context";
import { EVENTS } from "../constants";
import Card from "../components/ui/Card";
import EventsList from "../components/events/EventsList";
import EventNewForm from "../components/events/EventNewForm";
import { getAllEvents } from "../services/eventService";
import FlashMessagesContext from "../store/flash-messages-context";

function EventPage() {
  const navigate = useNavigate();
  const authCtx = useContext(AuthenticationContext);
  const flashMsgCtx = useContext(FlashMessagesContext);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    if (!authCtx.isLoggedIn()) {
      navigate(`/${EVENTS}`);
    }

    getAllEvents()
      .then((res) => {
        setEvents(res.data);
      })
      .catch((e) => {
        console.log(e);
        flashMsgCtx.handleError(e);
      })
      .finally(() => {});
  }, []);
  return (
    <Card>
      <div className="title">Events</div>
      <EventsList events={events} />
      <EventNewForm />
    </Card>
  );
}

export default EventPage;
