import { createContext, useState } from "react";
import { NavigateFunction } from "react-router-dom";
import { LOGIN } from "../constants";

interface Props {
  children: any;
}

const INFO_FLASH_TYPE = "info";
const SUCCESS_FLASH_TYPE = "success";
const ERROR_FLASH_TYPE = "danger";
const WARNING_FLASH_TYPE = "warning";
const DEFAULT_FLASH_TYPE = INFO_FLASH_TYPE;

interface Flash {
  message: string;
  type: string;
}

const FlashMessagesContext = createContext({
  setFlashMessage: (message: string, type?: string): void => {},
  handleSuccess: (res: any): void => {},
  handleError: (error: any, navigate: NavigateFunction): void => {},
  handleNotAuthenticatedAlert: (): void => {},
  clearFlashMessage: (): void => {},
  getFlashMessage: (): string => {
    return "";
  },
  getFlashMessageType: (): string => {
    return "";
  },
});

const defaultFlashMessage = {
  message: "",
  type: DEFAULT_FLASH_TYPE,
};

export function FlashMessagesContextProvider({ children }: Props) {
  const [flashMessage, setFlashMessage] = useState<Flash>(defaultFlashMessage);

  function setFlashMessageHandler(
    message: string,
    type = DEFAULT_FLASH_TYPE
  ): void {
    setFlashMessage({ message: message, type: type });
  }

  function handleSuccessHandler(res: any): void {
    console.log("SUCCESS", res);
    if (res?.data?.message) {
      setFlashMessageHandler(res.data.message, SUCCESS_FLASH_TYPE);
    } else if (res?.data) {
      setFlashMessageHandler(res.data, SUCCESS_FLASH_TYPE);
    } else if (res?.message) {
      setFlashMessageHandler(res.message, SUCCESS_FLASH_TYPE);
    }
  }

  function handleErrorHandler(error: any, navigate: NavigateFunction): void {
    console.log("ERROR", error);
    let message = "";
    console.log(error);
    if (error?.response?.status == 422) {
      message = JSON.stringify(error.response.data)
        .replace(/\[|\]|:|{|}|\\|"/g, " ")
        .replace(/,/g, `|`);
    } else if (error?.response?.status == (401 || 403)) {
      message = `You don't have access to that page`;
      navigate(`/${LOGIN}`);
    } else if (error?.response?.status == 500) {
      message = `It's server inner error. Please try again later`;
    } else if (error.code == "ERR_NETWORK") {
      message = `Cannot connect to the server`;
    } else {
      message = `An unxpected error occurred`;
    }

    setFlashMessageHandler(message, ERROR_FLASH_TYPE);
  }

  function handleNotAuthenticatedAlertHandler(): void {
    setFlashMessageHandler(
      "You are not authenticated to be on that site",
      WARNING_FLASH_TYPE
    );
  }

  function clearFlashMessageHandler(): void {
    setFlashMessage(defaultFlashMessage);
  }

  function getFlashMessageHandler(): string {
    return flashMessage.message;
  }

  function getFlashMessageTypeHandler(): string {
    return flashMessage.type;
  }

  const context = {
    setFlashMessage: setFlashMessageHandler,
    handleSuccess: handleSuccessHandler,
    handleError: handleErrorHandler,
    handleNotAuthenticatedAlert: handleNotAuthenticatedAlertHandler,
    clearFlashMessage: clearFlashMessageHandler,
    getFlashMessage: getFlashMessageHandler,
    getFlashMessageType: getFlashMessageTypeHandler,
  };

  return (
    <FlashMessagesContext.Provider value={context}>
      {children}
    </FlashMessagesContext.Provider>
  );
}

export default FlashMessagesContext;
export {
  SUCCESS_FLASH_TYPE,
  INFO_FLASH_TYPE,
  ERROR_FLASH_TYPE,
  WARNING_FLASH_TYPE,
  DEFAULT_FLASH_TYPE,
};
