import { Card } from "@mui/material";
import styles from "../../css/Form.module.css";
import { upperCaseFirstStringCharacter } from "../../helper";
import { ChangeEvent, FormEvent } from "react";
import { GuestModel, NameModel } from "../Models";

interface Props {
  guest: GuestModel;
  additionAttrNames: NameModel[];
  action: string;
  onGuestChange: Function;
  submitAction: Function;
}

function GuestForm({
  guest,
  additionAttrNames,
  action,
  onGuestChange,
  submitAction,
}: Props) {
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
          {additionAttrNames.map((name) => {
            function onChangeAdditionAttribiuteHandler(
              event: ChangeEvent<HTMLInputElement>
            ): void {
              console.log(guest);
              onGuestChange({
                ...guest,
                addition_attribiutes: [
                  {
                    addition_attribiute_name_id: name.id,
                    guest_id: guest.id,
                    value: event.target.value,
                  },
                  ...guest.addition_attribiutes,
                ],
              });
            }

            return (
              <div key={name.id} className={styles.control}>
                <label htmlFor={name.name}>{name.name}</label>
                <input
                  id={name.name}
                  type="text"
                  placeholder={name.default_value}
                  onChange={onChangeAdditionAttribiuteHandler}
                />
              </div>
            );
          })}
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
