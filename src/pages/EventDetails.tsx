import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthenticationContext from "../store/authentication-context";
import { EVENTS } from "../constants";

function EventDetails() {
  const navigate = useNavigate();
  const authCtx = useContext(AuthenticationContext);

  useEffect(() => {
    if (!authCtx.isSupportForEntertainment()) {
      navigate(`${EVENTS}`);
    }
  }, []);
  return <div>EventDetails</div>;
}

export default EventDetails;
