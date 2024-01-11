import { useContext } from "react";
import FlashMessagesContext from "../../store/flash-messages-context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

function Alert() {
  const flashMsgCtx = useContext(FlashMessagesContext);

  function closeAlertHandler(): void {
    flashMsgCtx.clearFlashMessage();
  }

  return (
    <>
      {flashMsgCtx.getFlashMessage() && (
        <>
          <div
            className={`alert alert-${flashMsgCtx.getFlashMessageType()}`}
            role="alert"
          >
            {flashMsgCtx.getFlashMessage()}
            <FontAwesomeIcon
              icon={faXmark}
              onClick={closeAlertHandler}
              className="alert-x"
            />
          </div>
        </>
      )}
    </>
  );
}

export default Alert;
