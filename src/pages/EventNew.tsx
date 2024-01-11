import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthenticationContext from "../store/authentication-context";
import { EVENTS } from "../constants";
import Card from "../components/ui/Card";

function EventNew() {
  const navigate = useNavigate();
  const authCtx = useContext(AuthenticationContext);

  useEffect(() => {
    if (!authCtx.isSupportForEntertainment()) {
      navigate(`${EVENTS}`);
    }
  }, []);
  return (
    <Card>
      <div className="title">Events</div>
    </Card>
  );
}

export default EventNew;
