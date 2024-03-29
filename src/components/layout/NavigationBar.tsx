import { Link, useNavigate } from "react-router-dom";

import styles from "./NavigationBar.module.css";
import {
  LOGIN,
  REGISTER,
  OFFERS,
  EVENTS,
  GUESTS,
  PROFILE,
} from "../../constants";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChurch, faBars } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import WindowSizeContext from "../../store/window-size-context";
import AuthenticationContext from "../../store/authentication-context";
import FlashMessagesContext from "../../store/flash-messages-context";

function NavigationBar() {
  const windowSizeCtx = useContext(WindowSizeContext);
  const authCtx = useContext(AuthenticationContext);
  const flashMsgCtx = useContext(FlashMessagesContext);
  const navigate = useNavigate();

  function logoutHandler(): void {
    authCtx.logout().then(() => {
      navigate(`/${LOGIN}`);
      flashMsgCtx.setFlashMessage("You have been logged out");
    });
  }

  return (
    <header className={styles.header}>
      <Link to={"/"}>
        <div className={styles.logo}>
          <FontAwesomeIcon icon={faChurch} />
          {windowSizeCtx.isWindowMoreWiderThan(300) &&
            (windowSizeCtx.isWindowLessWiderThan(1000)
              ? " YOW!"
              : " Your Own Wedding")}
        </div>
      </Link>
      {windowSizeCtx.isWindowLessWiderThan(700) ? (
        <nav>
          <ul>
            <li>
              <div className={styles.dropdown}>
                <div className={styles.link}>
                  Actions <FontAwesomeIcon icon={faBars} />
                </div>
                <div className={styles.dropdown_content}>
                  <Link className={styles.link} to={`/${OFFERS}`}>
                    All offers
                  </Link>
                  {authCtx.isSupportUser() && (
                    <>
                      <Link className={styles.link} to={`/${OFFERS}_my`}>
                        My offers
                      </Link>
                      <Link className={styles.link} to={`/${OFFERS}/new`}>
                        Add offer
                      </Link>
                    </>
                  )}
                  {authCtx.isClientUser() && (
                    <>
                      <Link className={styles.link} to={`/${GUESTS}`}>
                        Guests
                      </Link>
                    </>
                  )}
                  {authCtx.isLoggedIn() ? (
                    <>
                      <Link className={styles.link} to={`/${EVENTS}`}>
                        Events
                      </Link>
                      <Link className={styles.link} to={`/${PROFILE}`}>
                        Settings
                      </Link>
                      <span className={styles.link} onClick={logoutHandler}>
                        Log out
                      </span>
                    </>
                  ) : (
                    <>
                      <Link className={styles.link} to={`/${REGISTER}`}>
                        Register
                      </Link>
                      <Link className={styles.link} to={`/${LOGIN}`}>
                        Log in
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </li>
          </ul>
        </nav>
      ) : (
        <nav>
          <ul>
            <li>
              <Link to={"/"}>Home</Link>
            </li>
            {authCtx.isClientUser() && (
              <>
                <li>
                  <div className={styles.dropdown}>
                    <Link className={styles.dropdown} to={`/${GUESTS}`}>
                      Guests
                    </Link>
                  </div>
                </li>
              </>
            )}
            <li>
              <div className={styles.dropdown}>
                <Link className={styles.dropdown} to={`/${OFFERS}`}>
                  Offers
                </Link>
                <div className={styles.dropdown_content}>
                  <Link className={styles.link} to={`/${OFFERS}`}>
                    All offers
                  </Link>
                  {authCtx.isSupportUser() && (
                    <>
                      <Link className={styles.link} to={`/${OFFERS}_my`}>
                        My offers
                      </Link>
                      <Link className={styles.link} to={`/${OFFERS}/new`}>
                        Add offer
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </li>
            {authCtx.isLoggedIn() && (
              <li>
                <div className={styles.dropdown}>
                  <Link className={styles.dropdown} to={`/${EVENTS}`}>
                    Events
                  </Link>
                </div>
              </li>
            )}

            <li>
              <div className={styles.dropdown}>
                <Link
                  className={styles.dropdown}
                  to={authCtx.isLoggedIn() ? `/${PROFILE}` : `/${LOGIN}`}
                >
                  User
                </Link>
                <div className={styles.dropdown_content}>
                  {authCtx.isLoggedIn() ? (
                    <>
                      <Link className={styles.link} to={`/${PROFILE}`}>
                        Settings
                      </Link>
                      <span className={styles.link} onClick={logoutHandler}>
                        Log out
                      </span>
                    </>
                  ) : (
                    <>
                      <Link className={styles.link} to={`/${REGISTER}`}>
                        Register
                      </Link>
                      <Link className={styles.link} to={`/${LOGIN}`}>
                        Log in
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}

export default NavigationBar;
