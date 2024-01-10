import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthenticationContext from "../store/authentication-context";
import { EVENTS } from "../constants";

function EventNew() {
  const navigate = useNavigate();
  const authCtx = useContext(AuthenticationContext);

  useEffect(() => {
    if (!authCtx.isSupportForEntertainment()) {
      navigate(`${EVENTS}`);
    }
  }, []);
  return <div>EventNew</div>;
}

export default EventNew;
