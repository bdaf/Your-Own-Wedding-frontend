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
}

const FlashMessagesContext = createContext({
  setFlashMessage: (message: string, type: string): void => {
    message + type;
  },
  getFlashMessage: (): string => {
    return "";
  },
  getFlashMessageType: (): string => {
    return "";
  },
});

export function FlashMessagesContextProvider({ children }: Props) {
  const [flashMessage, setFlashMessage] = useState<Flash>({
    message: "",
    type: INFO_FLASH_TYPE,
  });

  function setFlashMessageHandler(message: string, type: string): void {
    setFlashMessage({ message: message, type: type });
  }

  function getFlashMessageHandler(): string {
    return flashMessage.message;
  }

  function getFlashMessageTypeHandler(): string {
    return flashMessage.type;
  }

  const context = {
    setFlashMessage: setFlashMessageHandler,
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
