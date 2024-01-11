import { createContext, useState } from "react";

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
  setFlashMessage: (message: string, type?: string): void => {
    message + type;
  },
  handleSuccess: (res: any): void => {
    res;
  },
  handleError: (error: any): void => {
    error;
  },
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
  redirects_to_reset: 0,
};

export function FlashMessagesContextProvider({ children }: Props) {
  const [flashMessage, setFlashMessage] = useState<Flash>(defaultFlashMessage);

  //   function makeFlashMessageOlderHandler(): void {
  //     if (flashMessage.message && flashMessage.redirects_to_reset > 0) {
  //       setFlashMessage({
  //         message: flashMessage.message,
  //         type: flashMessage.type,
  //         redirects_to_reset: flashMessage.redirects_to_reset - 1,
  //       });
  //     } else if (flashMessage.message) {
  //       setFlashMessage(defaultFlashMessage);
  //     }
  //   }

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
    } else if (res?.message) {
      setFlashMessageHandler(res.message, SUCCESS_FLASH_TYPE);
    }
  }

  function handleErrorHandler(error: any): void {
    console.log("ERROR", error);
    let message;
    if (error?.response?.data?.message) {
      message = error.response.data.message;
    } else if (error?.response) {
      message = `Error occurred, status of response is ${error.response.status}.`;
    } else if (error?.message) {
      message = `${error.message}`;
    } else {
      message = "An unxpected error occurred.";
    }
    setFlashMessageHandler(message, ERROR_FLASH_TYPE);
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
