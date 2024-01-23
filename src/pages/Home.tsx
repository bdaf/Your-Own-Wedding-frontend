import { useContext } from "react";
import AuthenticationContext from "../store/authentication-context";
import OrganizerHomeContent from "../components/others/OrganizerHomeContent";
import ProviderHomeContent from "../components/others/ProviderHomeContent";

function Home() {
  const authCtx = useContext(AuthenticationContext);
  const user = authCtx.getCurrentUser();

  return (
    <div>
      <div className="center text-center home_div">
        {authCtx.isClientUser() && (
          <OrganizerHomeContent user={authCtx.getCurrentUser()} />
        )}
        {authCtx.isSupportUser() && (
          <ProviderHomeContent user={authCtx.getCurrentUser()} />
        )}
      </div>
      <div className="center margin-2rem">
        <i>
          Listen {authCtx.getCurrentUser().email}, your current role is{" "}
          {authCtx.getCurrentUser().role}.
        </i>
      </div>
    </div>
  );
}

export default Home;
