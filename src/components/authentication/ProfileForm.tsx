import { ChangeEvent, FormEvent } from "react";
import styles from "../../css/Form.module.css";
import Card from "../ui/Card";
import { Authentication } from "../Models";
import {
  isUserOrganizerByAuthentication,
  isUserProviderByAuthentication,
} from "../../store/authentication-context";

interface Props {
  submitProfileForm: Function;
  setUser: Function;
  authentication: Authentication;
}

function ProfileForm({ submitProfileForm, setUser, authentication }: Props) {
  function setUserAttribiuteHandler(
    event: ChangeEvent<HTMLInputElement>
  ): void {
    setUser({
      ...authentication.user,
      [event.target.id]: event.target.value,
    });
  }

  function setUserOrganizerAttribiuteHandler(
    event: ChangeEvent<HTMLInputElement>
  ): void {
    setUser({
      ...authentication.user,
      organizer: {
        ...authentication.user.organizer!,
        [event.target.id]: event.target.value,
      },
    });
  }

  function setUserProviderAttribiuteHandler(
    event: ChangeEvent<HTMLInputElement>
  ): void {
    setUser({
      ...authentication.user,
      provider: {
        ...authentication.user.provider!,
        [event.target.id]: event.target.value,
      },
    });
  }

  function submitHandler(event: FormEvent<HTMLFormElement>): void {
    submitProfileForm(event, authentication.user);
  }

  return (
    <div className={styles.container}>
      <Card>
        <form className={styles.form} onSubmit={submitHandler}>
          <div className={styles.control}>
            <label htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              value={authentication.user.name || ""}
              onChange={setUserAttribiuteHandler}
            />
          </div>

          <div className={styles.control}>
            <label htmlFor="surname">Surname</label>
            <input
              id="surname"
              type="text"
              value={authentication.user.surname || ""}
              onChange={setUserAttribiuteHandler}
            />
          </div>

          {isUserOrganizerByAuthentication(authentication) && (
            <div className={styles.control}>
              <label htmlFor="celebration_date">Celebration date</label>
              <input
                id="celebration_date"
                type="datetime-local"
                value={
                  authentication.user.organizer?.celebration_date?.split(".")[0]
                }
                onChange={setUserOrganizerAttribiuteHandler}
              />
            </div>
          )}

          {isUserProviderByAuthentication(authentication) && (
            <>
              <div className={styles.control}>
                <label htmlFor="address">Address</label>
                <input
                  id="address"
                  type="text"
                  value={authentication.user.provider?.address!}
                  onChange={setUserProviderAttribiuteHandler}
                />
              </div>
              <div className={styles.control}>
                <label htmlFor="phone_number">Phone number</label>
                <input
                  id="phone_number"
                  type="tel"
                  value={authentication.user.provider?.phone_number!}
                  onChange={setUserProviderAttribiuteHandler}
                />
              </div>
            </>
          )}

          <div className={styles.actions}>
            <button className="btn">Save changes</button>
          </div>
        </form>
      </Card>
    </div>
  );
}

export default ProfileForm;
