import { ChangeEvent, FormEvent, useContext, useState } from "react";
import styles from "../../css/Form.module.css";
import Card from "../ui/Card";
import { User } from "../Models";

interface Props {
  userFromProps: User;
}

function ProfileForm({ userFromProps }: Props) {
  const [user, setUser] = useState(userFromProps);
  function submitHandler(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
  }

  function setUserHandler(a_user: User) {
    console.log(a_user);
    setUser(a_user);
  }

  function setUserAttribiuteHandler(
    event: ChangeEvent<HTMLInputElement>
  ): void {
    setUserHandler({
      ...user,
      [event.target.id]: event.target.value,
    });
  }

  function setUserOrganizerAttribiuteHandler(
    event: ChangeEvent<HTMLInputElement>
  ): void {
    setUserHandler({
      ...user,
      organizer: {
        ...user.organizer!,
        [event.target.id]: event.target.value,
      },
    });
  }

  function setUserProviderAttribiuteHandler(
    event: ChangeEvent<HTMLInputElement>
  ): void {
    setUserHandler({
      ...user,
      provider: {
        ...user.provider,
        [event.target.id]: event.target.value,
      },
    });
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
              required
              value={user.name}
              onChange={setUserAttribiuteHandler}
            />
          </div>

          <div className={styles.control}>
            <label htmlFor="surname">Surname</label>
            <input
              id="surname"
              type="text"
              required
              value={user.surname}
              onChange={setUserAttribiuteHandler}
            />
          </div>

          {user.role == "organizer" && (
            <div className={styles.control}>
              <label htmlFor="celebraion_date">Celebration date</label>
              <input
                id="celebraion_date"
                type="date"
                required
                value={user.organizer?.celebration_date}
                onChange={setUserOrganizerAttribiuteHandler}
              />
            </div>
          )}

          {user.role == "provider" && (
            <>
              <div className={styles.control}>
                <label htmlFor="address">Address</label>
                <input
                  id="address"
                  type="text"
                  required
                  value={user.provider?.address}
                  onChange={setUserProviderAttribiuteHandler}
                />
              </div>
              <div className={styles.control}>
                <label htmlFor="phone_number">Phone number</label>
                <input
                  id="phone_number"
                  type="tel"
                  required
                  value={user.provider?.phone_number}
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
