import { createContext, useEffect, useState } from "react";
import { logged_in } from "../services/userService";
import { User, AuthenticationResponse } from "../models/User";

interface Props {
  children: any;
}

interface Authentication {
  user: User;
  isLoggedIn: boolean;
}

const defaultEmptyUser: User = {
  email: "",
  role: "",
};

const emptyAuthentication: Authentication = {
  user: defaultEmptyUser,
  isLoggedIn: false,
};

const AuthenticationContext = createContext({
  isLoggedIn: false,
  getCurrentUser: (): User => {
    return defaultEmptyUser;
  },
  isSupportForEntertainment: (): boolean => {
    return false;
  },
  isCommonUser: (): boolean => {
    return false;
  },
  isAdmin: (): boolean => {
    return false;
  },
  updateAuthentication: (): void => {},
});

export function AuthenticationContextProvider({ children }: Props) {
  const [authentication, setAuthentication] =
    useState<Authentication>(emptyAuthentication);

  function checkAndSetIfLoggedIn() {
    logged_in()
      .then((response) => {
        console.log("Login response (checkAndSetIfLoggedIn): ", response);
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

  function getCurrentUserHandler(): User {
    return authentication.user ? { ...authentication.user } : defaultEmptyUser;
  }
  function isCommonUserHandler(): boolean {
    return authentication.user.role === "user";
  }
  function isSupportForEntertainmentHandler(): boolean {
    return authentication.user.role === "support";
  }
  function isAdminHandler(): boolean {
    return authentication.user.role === "admin";
  }
  function updateAuthenticationHandler(): void {
    checkAndSetIfLoggedIn();
  }

  const context = {
    isLoggedIn: authentication.isLoggedIn,
    getCurrentUser: getCurrentUserHandler,
    isAdmin: isAdminHandler,
    isSupportForEntertainment: isSupportForEntertainmentHandler,
    isCommonUser: isCommonUserHandler,
    updateAuthentication: updateAuthenticationHandler,
  };

  return (
    <AuthenticationContext.Provider value={context}>
      {children}
    </AuthenticationContext.Provider>
  );
}

export default AuthenticationContext;
