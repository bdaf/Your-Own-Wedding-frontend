import { FormEvent, useContext, useEffect, useState } from "react";
import ProfileForm from "../components/authentication/ProfileForm";
import {
  Authentication,
  AuthenticationResponse,
  UserModel,
  emptyAuthentication,
} from "../components/Models";
import { logged_in, updateProfile } from "../services/userService";
import { useNavigate } from "react-router-dom";
import { LOGIN } from "../constants";
import FlashMessagesContext, {
  SUCCESS_FLASH_TYPE,
} from "../store/flash-messages-context";

function ProfilePage() {
  const navigate = useNavigate();
  const flashMsgCtx = useContext(FlashMessagesContext);
  const [authentication, setAuthentication] =
    useState<Authentication>(emptyAuthentication);

  function setUserHandler(a_user: UserModel) {
    setAuthentication({
      logged_in: authentication.logged_in,
      user: a_user,
    });
  }

  useEffect(() => {
    logged_in().then((response) => {
      const isLoggedInResponse: AuthenticationResponse = response.data;
      if (isLoggedInResponse?.logged_in) {
        setAuthentication({
          logged_in: isLoggedInResponse.logged_in,
          user: isLoggedInResponse.user!,
        });
      } else {
        navigate(`/${LOGIN}`);
        flashMsgCtx.setFlashMessage("You neeed to log in to edit profile");
      }
    });
  }, []);

  function submitProfileHandler(
    event: FormEvent<HTMLFormElement>,
    user: UserModel
  ): void {
    event.preventDefault();
    updateProfile(user)
      .then((res) => {
        setAuthentication({
          ...authentication,
          user: res.data.user,
        });
        flashMsgCtx.setFlashMessage(
          "Profile has been updated",
          SUCCESS_FLASH_TYPE
        );
      })
      .catch((error) => {
        flashMsgCtx.handleError(error, useNavigate);
      });
  }

  return (
    <div>
      <div className="title">Profile Page</div>
      <ProfileForm
        submitProfileForm={submitProfileHandler}
        setUser={setUserHandler}
        authentication={authentication}
      />
    </div>
  );
}

export default ProfilePage;
