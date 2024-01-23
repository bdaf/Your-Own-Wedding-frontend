import { createContext, useEffect, useState } from "react";
import { logged_in, logout } from "../services/userService";
import {
  AuthenticationResponse,
  User,
  defaultEmptyUser,
} from "../components/Models";
import FlashMessagesContext, {
  ERROR_FLASH_TYPE,
} from "./flash-messages-context";

interface Props {
  children: any;
}

interface Authentication {
  user: User;
  isLoggedIn: boolean;
}

const emptyAuthentication: Authentication = {
  user: defaultEmptyUser,
  isLoggedIn: false,
};

const initAuthentication: Authentication = {
  user: defaultEmptyUser,
  isLoggedIn: true,
};

const AuthenticationContext = createContext({
  isLoggedIn: (): boolean => {
    return false;
  },
  getCurrentUser: (): User => {
    return defaultEmptyUser;
  },
  isSupportUser: (): boolean => {
    return false;
  },
  isClientUser: (): boolean => {
    return false;
  },
  isAdmin: (): boolean => {
    return false;
  },
  updateAuthentication: (flashMsgCtx: any): any => {},
  logout: (): any => {},
});

export function AuthenticationContextProvider({ children }: Props) {
  const [authentication, setAuthentication] =
    useState<Authentication>(initAuthentication);

  function checkAndSetIfLoggedIn(flashMsgCtx: any): any {
    return logged_in()
      .then((response) => {
        // console.log("Login response (checkAndSetIfLoggedIn): ", response);
        const isLoggedInResponse: AuthenticationResponse = response.data;
        console.log(isLoggedInResponse);
        const user = isLoggedInResponse.user;
        if (isLoggedInResponse?.days_to_ceremony) {
          user!.organizer!.days_to_ceremony =
            isLoggedInResponse?.days_to_ceremony;
        }
        setAuthentication({
          user: user || defaultEmptyUser,
          isLoggedIn: isLoggedInResponse.logged_in,
        });
        if (isLoggedInResponse.logged_in && flashMsgCtx != null) {
          flashMsgCtx.setFlashMessage("You have been logged in succesfully");
        } else if (flashMsgCtx != null) {
          flashMsgCtx.setFlashMessage(
            "You are not logged in",
            ERROR_FLASH_TYPE
          );
        }
      })
      .catch((error) => {
        console.log("Error while checking if currently logged in: ", error);
        setAuthentication(emptyAuthentication);
      });
  }

  useEffect(() => {
    checkAndSetIfLoggedIn(null);
  }, []);

  function isLoggedInHandler(): boolean {
    return authentication.isLoggedIn;
  }
  function getCurrentUserHandler(): User {
    return authentication.user ? { ...authentication.user } : defaultEmptyUser;
  }
  function isClientUserHandler(): boolean {
    return (
      authentication.isLoggedIn && authentication.user.role === "organizer"
    );
  }
  function isSupportUserHandler(): boolean {
    return authentication.isLoggedIn && authentication.user.role === "provider";
  }
  function isAdminHandler(): boolean {
    return authentication.isLoggedIn && authentication.user.role === "admin";
  }
  function updateAuthenticationHandler(flashMsgCtx: any): any {
    checkAndSetIfLoggedIn(flashMsgCtx);
  }
  function logoutHandler() {
    return logout()
      .then((response) => {
        console.log("Session has been cleaned.", response);
      })
      .catch((error) => {
        console.log("Error during logout:", error);
      })
      .finally(() => {
        setAuthentication(emptyAuthentication);
        checkAndSetIfLoggedIn(null);
        console.log("Local session has been cleaned.");
      });
  }

  const context = {
    isLoggedIn: isLoggedInHandler,
    getCurrentUser: getCurrentUserHandler,
    isAdmin: isAdminHandler,
    isSupportUser: isSupportUserHandler,
    isClientUser: isClientUserHandler,
    updateAuthentication: updateAuthenticationHandler,
    logout: logoutHandler,
  };

  return (
    <AuthenticationContext.Provider value={context}>
      {children}
    </AuthenticationContext.Provider>
  );
}

export default AuthenticationContext;
