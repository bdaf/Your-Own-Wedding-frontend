import { createContext, useEffect, useState } from "react";
import { logged_in, logout } from "../services/userService";
import {
  Authentication,
  AuthenticationResponse,
  UserModel,
  defaultEmptyUser,
  emptyAuthentication,
  initAuthentication,
} from "../components/Models";
import { ERROR_FLASH_TYPE } from "./flash-messages-context";

interface Props {
  children: any;
}

const AuthenticationContext = createContext({
  isLoggedIn: (): boolean => {
    return false;
  },
  getCurrentUser: (): UserModel => {
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

function isUserOrganizerByAuthentication(
  authentication: Authentication
): boolean {
  return authentication.logged_in && authentication.user.role === "organizer";
}
function isUserProviderByAuthentication(
  authentication: Authentication
): boolean {
  return authentication.logged_in && authentication.user.role === "provider";
}
function isUserOrganizer(user: UserModel): boolean {
  return user && user.role === "organizer";
}
function isUserProvider(user: UserModel): boolean {
  return user && user.role === "provider";
}

export function AuthenticationContextProvider({ children }: Props) {
  const [authentication, setAuthentication] =
    useState<Authentication>(initAuthentication);

  function checkAndSetIfLoggedIn(flashMsgCtx: any): any {
    return logged_in()
      .then((response) => {
        const isLoggedInResponse: AuthenticationResponse = response.data;
        console.log(isLoggedInResponse);
        setAuthentication({
          user: isLoggedInResponse.user || defaultEmptyUser,
          logged_in: isLoggedInResponse.logged_in,
        });
        if (isLoggedInResponse.logged_in && flashMsgCtx != null) {
          flashMsgCtx.setFlashMessage("You have been logged in succesfully");
        } else if (flashMsgCtx != null) {
          flashMsgCtx.setFlashMessage(
            "You are not logged in, error occured",
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
    return authentication.logged_in;
  }
  function getCurrentUserHandler(): UserModel {
    return authentication.user ? { ...authentication.user } : defaultEmptyUser;
  }
  function isClientUserHandler(): boolean {
    return isUserOrganizerByAuthentication(authentication);
  }
  function isSupportUserHandler(): boolean {
    console.log(authentication);
    return authentication.logged_in && authentication.user.role === "provider";
  }
  function isAdminHandler(): boolean {
    return authentication.logged_in && authentication.user.role === "admin";
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
export {
  isUserOrganizerByAuthentication,
  isUserProviderByAuthentication,
  isUserProvider,
  isUserOrganizer,
};
