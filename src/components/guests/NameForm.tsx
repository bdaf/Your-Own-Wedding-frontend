import { Card } from "@mui/material";
import styles from "../../css/Form.module.css";
import { ChangeEvent, FormEvent } from "react";
import { upperCaseFirstStringCharacter } from "../../helper";
import { NameModel } from "../Models";

interface Props {
  action: string;
  name: NameModel;
  setCurrentAttribiuteName: Function;
  submitAction: Function;
}

function AdditionAttribiuteForm({
  action,
  name,
  setCurrentAttribiuteName,
  submitAction,
}: Props) {
  function submitHandler(event: FormEvent<HTMLFormElement>): void {
    submitAction(event);
  }

  function onChangeHandler(event: ChangeEvent<HTMLInputElement>): void {
    setCurrentAttribiuteName({
      ...name,
      [event.target.id]: event.target.value,
    });
  }
  console.log(name);
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
              value={name.name}
            />
          </div>
          <div className={styles.control}>
            <label htmlFor="default_value">Default Value</label>
            <input
              id="default_value"
              type="text"
              onChange={onChangeHandler}
              value={name.default_value}
            />
          </div>
          <div className={`${styles.actions} guest_action`}>
            <button className={`btn-` + action}>
              {upperCaseFirstStringCharacter(action)}
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
}

export default AdditionAttribiuteForm;
