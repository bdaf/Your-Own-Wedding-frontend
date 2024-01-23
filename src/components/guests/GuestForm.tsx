import { Card } from "@mui/material";
import styles from "../../css/Form.module.css";
import { upperCaseFirstStringCharacter } from "../../helper";
import { ChangeEvent, FormEvent } from "react";
import { GuestModel } from "../Models";

interface Props {
  guest: GuestModel;
  action: string;
  onGuestChange: Function;
  submitAction: Function;
}

function GuestForm({ guest, action, onGuestChange, submitAction }: Props) {
  function submitHandler(event: FormEvent<HTMLFormElement>): void {
    submitAction(event);
  }

  function onChangeHandler(event: ChangeEvent<HTMLInputElement>): void {
    onGuestChange({
      ...guest,
      [event.target.id]: event.target.value,
    });
  }

  return (
    <div className={`${styles.guest_container}`}>
      <Card>
        <form className={styles.form} onSubmit={submitHandler}>
          <div className={styles.control}>
            <label htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              onChange={onChangeHandler}
              required
              value={guest.name}
            />
          </div>
          <div className={styles.control}>
            <label htmlFor="surname">Surname</label>
            <input
              id="surname"
              type="text"
              onChange={onChangeHandler}
              value={guest.surname}
            />
          </div>
          <div className={styles.actions}>
            <button className={`btn-` + action}>
              {upperCaseFirstStringCharacter(action)}
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
}

export default GuestForm;
