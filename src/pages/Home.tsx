import { useContext } from "react";
import AuthenticationContext from "../store/authentication-context";

function Home() {
  const authCtx = useContext(AuthenticationContext);
  return (
    <div>
      <div className="title">Home page</div>
      <div className="center">
        {authCtx.isLoggedIn &&
          `Hello ${authCtx.getCurrentUser().email}, your current role is: ${
            authCtx.getCurrentUser().role
          }.`}
      </div>
    </div>
  );
}

export default Home;
