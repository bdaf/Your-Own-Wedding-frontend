import { useContext } from "react";
import ProfileForm from "../components/authentication/ProfileForm";
import AuthenticationContext from "../store/authentication-context";

function ProfilePage() {
  const authCtx = useContext(AuthenticationContext);
  return (
    <div>
      <div className="title">Profile Page</div>
      <ProfileForm userFromProps={authCtx.getCurrentUser()} />
    </div>
  );
}

export default ProfilePage;
