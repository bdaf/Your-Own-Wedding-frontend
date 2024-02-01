import { useEffect, useState } from "react";
import OrganizerHomeContent from "../components/others/OrganizerHomeContent";
import ProviderHomeContent from "../components/others/ProviderHomeContent";
import { homePageUserData } from "../services/userService";
import {
  AuthenticationResponse,
  HomePageDataResponse,
  emptyAuthentication,
  emptyHomePageData,
} from "../components/Models";
import {
  isUserOrganizer,
  isUserProvider,
} from "../store/authentication-context";

function Home() {
  const [homePageData, setIsHomePageData] = useState(emptyHomePageData);

  useEffect(() => {
    homePageUserData().then((response) => {
      console.log(response);
      const homePageData: HomePageDataResponse = response.data;
      if (homePageData?.user) {
        setIsHomePageData({
          user: homePageData.user,
          addition_data: homePageData.addition_data,
        });
      }
    });
  }, []);

  return (
    <div>
      <div className="center text-center home_div">
        {homePageData.user && (
          <div>
            {isUserOrganizer(homePageData.user) && (
              <OrganizerHomeContent
                celebrationDaysAmount={homePageData.addition_data}
              />
            )}
            {isUserProvider(homePageData.user) && (
              <ProviderHomeContent contact={homePageData.addition_data} />
            )}
            <div className="center margin-2rem">
              <i>
                Listen {homePageData.user.email}, your current role is{" "}
                {homePageData.user.role}.
              </i>
            </div>
          </div>
        )}
        {!homePageData.user && (
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
