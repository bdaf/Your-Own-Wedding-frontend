import { useContext } from "react";
import FlashMessagesContext from "../../store/flash-messages-context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

function Alert() {
  const flashMsgCtx = useContext(FlashMessagesContext);

  function closeAlertHandler(): void {
    flashMsgCtx.clearFlashMessage();
  }

  // Checks if previous error message was regarding the same model like in the previous error
  function is_prev_model_same(
    message: string,
    index: number,
    array: string[]
  ): boolean {
    const is_prev_same =
      index > 0 &&
      message.split(" ").filter(Boolean)[0] ==
        array[index - 1].split(" ").filter(Boolean)[0];
    return is_prev_same;
  }

  return (
    <>
      {flashMsgCtx.getFlashMessage() && (
        <>
          <div
            className={`alert alert-${flashMsgCtx.getFlashMessageType()}`}
            role="alert"
          >
            <div>
              {flashMsgCtx
                .getFlashMessage()
                .split("|")
                .map(
                  (message: string, index: number, array: string[]) =>
                    !is_prev_model_same(message.trim(), index, array) && (
                      <div key={index}>
                        <span>{`${message.trim()}.`}</span>
                        <br></br>
                      </div>
                    )
                )}
            </div>
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
