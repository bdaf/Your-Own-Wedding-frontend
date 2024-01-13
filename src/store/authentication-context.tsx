import { createContext, useEffect, useState } from "react";
import { logged_in, logout } from "../services/userService";
import { User, AuthenticationResponse } from "../models/User";

interface Props {
  children: any;
}

interface Authentication {
  user: User;
  isLoggedIn: boolean;
}

const defaultEmptyUser: User = {
  id: -1,
  email: "",
  role: "",
};

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
  isSupportForEntertainment: (): boolean => {
    return false;
  },
  isClientUser: (): boolean => {
    return false;
  },
  isAdmin: (): boolean => {
    return false;
  },
  updateAuthentication: (): void => {},
  logout: (): any => {},
});

export function AuthenticationContextProvider({ children }: Props) {
  const [authentication, setAuthentication] =
    useState<Authentication>(emptyAuthentication);

  function checkAndSetIfLoggedIn(): any {
    logged_in()
      .then((response) => {
        // console.log("Login response (checkAndSetIfLoggedIn): ", response);
        const isLoggedInResponse: AuthenticationResponse = response.data;
        console.log(isLoggedInResponse);
        setAuthentication({
          user: isLoggedInResponse.user || defaultEmptyUser,
          isLoggedIn: isLoggedInResponse.logged_in,
        });
      })
      .catch((error) => {
        console.log("Error while checking if currently logged in: ", error);
        setAuthentication(emptyAuthentication);
      });
  }

  useEffect(() => {
    checkAndSetIfLoggedIn();
  }, []);

  function isLoggedInHandler(): boolean {
    return authentication.isLoggedIn;
  }
  function getCurrentUserHandler(): User {
    return authentication.user ? { ...authentication.user } : defaultEmptyUser;
  }
  function isClientUserHandler(): boolean {
    return authentication.isLoggedIn && authentication.user.role === "client";
  }
  function isSupportForEntertainmentHandler(): boolean {
    return authentication.isLoggedIn && authentication.user.role === "support";
  }
  function isAdminHandler(): boolean {
    return authentication.isLoggedIn && authentication.user.role === "admin";
  }
  function updateAuthenticationHandler(): void {
    checkAndSetIfLoggedIn();
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
        checkAndSetIfLoggedIn();
        console.log("Local session has been cleaned.");
      });
  }

  const context = {
    isLoggedIn: isLoggedInHandler,
    getCurrentUser: getCurrentUserHandler,
    isAdmin: isAdminHandler,
    isSupportForEntertainment: isSupportForEntertainmentHandler,
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
