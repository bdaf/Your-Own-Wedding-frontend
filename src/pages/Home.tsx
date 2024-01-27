import { useEffect, useState } from "react";
import OrganizerHomeContent from "../components/others/OrganizerHomeContent";
import ProviderHomeContent from "../components/others/ProviderHomeContent";
import { logged_in } from "../services/userService";
import {
  AuthenticationResponse,
  emptyAuthentication,
} from "../components/Models";
import {
  isUserOrganizer,
  isUserProvider,
} from "../store/authentication-context";

function Home() {
  const [loggedInResponse, setIsLoggedInResponse] =
    useState(emptyAuthentication);
  const [daysToCeremony, setDaysToCeremony] = useState(0);

  useEffect(() => {
    logged_in().then((response) => {
      const isLoggedInResponse: AuthenticationResponse = response.data;
      if (isLoggedInResponse?.logged_in) {
        setDaysToCeremony(isLoggedInResponse?.days_to_ceremony!);
        setIsLoggedInResponse({
          logged_in: isLoggedInResponse.logged_in,
          user: isLoggedInResponse.user!,
        });
      }
    });
  }, []);

  return (
    <div>
      <div className="center text-center home_div">
        {loggedInResponse.logged_in && (
          <div>
            {isUserOrganizer(loggedInResponse) && (
              <OrganizerHomeContent daysToCeremony={daysToCeremony} />
            )}
            {isUserProvider(loggedInResponse) && (
              <ProviderHomeContent user={loggedInResponse.user} />
            )}
            <div className="center margin-2rem">
              <i>
                Listen {loggedInResponse.user.email}, your current role is{" "}
                {loggedInResponse.user.role}.
              </i>
            </div>
          </div>
        )}
        {!loggedInResponse.logged_in && (
          <div className="margin-2rem">
            <h1 className="title">Your Own Wedding</h1>
            <h3>Create Offers, plan your Events, attach Notes to these.</h3> If
            you want to create a Wedding, create Guests list! And add your own
            addition guest attribiutes as you want! Try how easy and simple it
            it!
            <h2>Don't hesitate, create account now!</h2>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
