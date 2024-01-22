import {
  ChangeEvent,
  FormEvent,
  RefObject,
  useContext,
  useRef,
  useState,
} from "react";
import Card from "../ui/Card";

import styles from "../../css/Form.module.css";
import { useNavigate } from "react-router-dom";
import { UserRegister } from "../../models/User";
import { register } from "../../services/userService";
import AuthenticationContext from "../../store/authentication-context";
import FlashMessagesContext, {
  SUCCESS_FLASH_TYPE,
} from "../../store/flash-messages-context";

function RegisterForm() {
  const navigate = useNavigate();
  const authCtx = useContext(AuthenticationContext);
  const flashMsgCtx = useContext(FlashMessagesContext);

  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState("organizer");

  const emailInputRef: RefObject<HTMLInputElement> = useRef(null);
  const passwordInputRef: RefObject<HTMLInputElement> = useRef(null);
  const passwordConfirmationInputRef: RefObject<HTMLInputElement> =
    useRef(null);
  const celebrationDateInputRef: RefObject<HTMLInputElement> = useRef(null);
  const addressInputRef: RefObject<HTMLInputElement> = useRef(null);
  const phoneNumberInputRef: RefObject<HTMLInputElement> = useRef(null);

  async function submitHandler(
    event: FormEvent<HTMLFormElement>
  ): Promise<void> {
    event.preventDefault();
    setLoading(true);

    const enteredEmail = emailInputRef.current!.value;
    const enteredCelebrationDate = celebrationDateInputRef.current?.value;
    const enteredAddress = addressInputRef.current?.value;
    const enteredPhoneNumber = phoneNumberInputRef.current?.value;
    const enteredPassword = passwordInputRef.current!.value;
    const enteredPasswordConfirmation =
      passwordConfirmationInputRef.current!.value;

    const userToRegister: UserRegister = {
      email: enteredEmail,
      role: role,
      celebration_date: enteredCelebrationDate,
      address: enteredAddress,
      phone_number: enteredPhoneNumber,
      password: enteredPassword,
      password_confirmation: enteredPasswordConfirmation,
    };

    register(userToRegister)
      .then((response) => {
        console.log("Registration response: ", response);
        authCtx.updateAuthentication();
        flashMsgCtx.setFlashMessage(
          "You have been registered succesfully",
          SUCCESS_FLASH_TYPE
        );
        navigate(`/`);
      })
      .catch((error) => {
        flashMsgCtx.handleError(error, navigate);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  if (loading) return <div className="title">Loading...</div>;

  function roleChangeHandler(event: ChangeEvent<HTMLSelectElement>): void {
    event.preventDefault();
    setRole(event.target.value);
  }

  return (
    <div className={styles.container}>
      <Card>
        <form className={styles.form} onSubmit={submitHandler}>
          <div className={styles.control}>
            <label htmlFor="email">Email</label>
            <input id="email" type="text" required ref={emailInputRef} />
          </div>

          <div className={styles.control}>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              required
              ref={passwordInputRef}
            />
          </div>
          <div className={styles.control}>
            <label htmlFor="password_confirmation">Password confirmation</label>
            <input
              id="password_confirmation"
              type="password"
              required
              ref={passwordConfirmationInputRef}
            />
          </div>

          <div className={styles.control}>
            <label htmlFor="role">Role</label>
            <select id="role" name="role" onChange={roleChangeHandler}>
              <option value="organizer">Wedding organizer</option>
              <option value="provider">Wedding service provider</option>
            </select>
          </div>
          {role == "organizer" && (
            <div className={styles.control}>
              <label htmlFor="celebraion_date">Celebration date</label>
              <input
                id="celebraion_date"
                type="date"
                required
                ref={celebrationDateInputRef}
              />
            </div>
          )}

          {role == "provider" && (
            <>
              <div className={styles.control}>
                <label htmlFor="address">Address</label>
                <input
                  id="address"
                  type="text"
                  required
                  ref={addressInputRef}
                />
              </div>
              <div className={styles.control}>
                <label htmlFor="phone_number">Phone number</label>
                <input
                  id="phone_number"
                  type="tel"
                  required
                  ref={phoneNumberInputRef}
                />
              </div>
            </>
          )}

          <div className={styles.actions}>
            <button className="btn">Create Account</button>
          </div>
        </form>
      </Card>
    </div>
  );
}

export default RegisterForm;
