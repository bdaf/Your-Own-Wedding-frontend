import { createContext, useState } from "react";

interface Props {
  children: any;
}

const INFO_FLASH_TYPE = "INFO";
const SUCCESS_FLASH_TYPE = "SUCCESS";
const ERROR_FLASH_TYPE = "ERROR";
const WARNING_FLASH_TYPE = "WARNING";
const DEFAULT_FLASH_TYPE = INFO_FLASH_TYPE;

interface Flash {
  message: string;
  type: string;
  redirects_to_reset: number;
}

const FlashMessagesContext = createContext({
  setFlashMessage: (message: string, type: string): void => {
    message + type;
  },
  makeFlashMessageOlder: (): string => {
    return "";
  },
  getFlashMessage: (): string => {
    return "";
  },
  getFlashMessageType: (): string => {
    return "";
  },
});

const defaultFlashMessage = {
  message: "",
  type: INFO_FLASH_TYPE,
  redirects_to_reset: 0,
};

export function FlashMessagesContextProvider({ children }: Props) {
  const [flashMessage, setFlashMessage] = useState<Flash>(defaultFlashMessage);

  function setFlashMessageHandler(message: string, type: string): void {
    setFlashMessage({ message: message, type: type, redirects_to_reset: 5 });
  }

  function makeFlashMessageOlderHandler(): void {
    if (flashMessage.message && flashMessage.redirects_to_reset > 0) {
      setFlashMessage({
        message: flashMessage.message,
        type: flashMessage.type,
        redirects_to_reset: flashMessage.redirects_to_reset - 1,
      });
    } else if (flashMessage.message) {
      setFlashMessage(defaultFlashMessage);
    }
  }

  function getFlashMessageHandler(): string {
    return flashMessage.message;
  }

  function getFlashMessageTypeHandler(): string {
    return flashMessage.type;
  }

  const context = {
    setFlashMessage: setFlashMessageHandler,
    makeFlashMessageOlder: makeFlashMessageOlderHandler,
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
