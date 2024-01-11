import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthenticationContext from "../store/authentication-context";
import { EVENTS } from "../constants";
import Card from "../components/ui/Card";

function EventPage() {
  const navigate = useNavigate();
  const authCtx = useContext(AuthenticationContext);

  useEffect(() => {
    if (!authCtx.isLoggedIn()) {
      navigate(`/${EVENTS}`);
    }
  }, []);
  return (
    <Card>
      <div className="title">Events</div>
    </Card>
  );
}

export default EventPage;
