import { FormEvent, RefObject, useRef, useState } from "react";
import Card from "../ui/Card";

import styles from "../css/Form.module.css";
import { useNavigate } from "react-router-dom";
import { User, UserLogin } from "../models/User";
import { login } from "../services/userService";

function LoginForm() {
  const navigate = useNavigate();
  const emailInputRef: RefObject<HTMLInputElement> = useRef(null);
  const passwordInputRef: RefObject<HTMLInputElement> = useRef(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function submitHandler(
    event: FormEvent<HTMLFormElement>
  ): Promise<void> {
    event.preventDefault();
    setLoading(true);

    const enteredEmail = emailInputRef.current!.value;
    const enteredPassword = passwordInputRef.current!.value;

    const userToLogin: UserLogin = {
      email: enteredEmail,
      password: enteredPassword,
    };

    login(userToLogin)
      .then((response) => {
        console.log("Login response: ", response);
        const loggedUser: User = response.data.user;
        console.log(loggedUser);
      })
      .catch((error) => {
        setError("Error occurred during creating session.");
        console.log("Error occured: ", error);
      })
      .finally(() => {
        setLoading(false);
      });

    navigate(`/`);
  }

  if (loading) return <div className="title">Loading...</div>;
  if (error) return <div className="title">{error}</div>;

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
          <div className={styles.actions}>
            <button className="btn">Log in</button>
          </div>
        </form>
      </Card>
    </div>
  );
}

export default LoginForm;
