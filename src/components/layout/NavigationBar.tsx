import { Link, useNavigate } from "react-router-dom";

import styles from "./NavigationBar.module.css";
import { LOGIN, REGISTER, OFFERS, EVENTS } from "../../constants";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChurch } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import WindowSizeContext from "../../store/window-size-context";
import AuthenticationContext from "../../store/authentication-context";

function NavigationBar() {
  const windowSizeCtx = useContext(WindowSizeContext);
  const authCtx = useContext(AuthenticationContext);
  const navigate = useNavigate();

  function logoutHandler(): void {
    authCtx.logout();
    navigate(`${LOGIN}`);
  }

  return (
    <header className={styles.header}>
      <Link to={"/"}>
        <div className={styles.logo}>
          <FontAwesomeIcon icon={faChurch} />
          {windowSizeCtx.isWindowMoreWiderThan(550) &&
            (windowSizeCtx.isWindowLessWiderThan(1000)
              ? " YOW!"
              : " Your Own Wedding")}
        </div>
      </Link>
      <nav>
        <ul>
          <li>
            <Link to={"/"}>Home</Link>
          </li>
          <li>
            <div className={styles.dropdown}>
              <Link className={styles.dropdown} to={`/${OFFERS}`}>
                Offers
              </Link>
              <div className={styles.dropdown_content}>
                <Link className={styles.link} to={`/${OFFERS}`}>
                  All offers
                </Link>
                {authCtx.isSupportForEntertainment() && (
                  <Link className={styles.link} to={`/${OFFERS}/new`}>
                    Add offer
                  </Link>
                )}
              </div>
            </div>
          </li>
          {authCtx.isLoggedIn() && (
            <li>
              <div className={styles.dropdown}>
                <Link className={styles.dropdown} to={`/${EVENTS}`}>
                  Notes
                </Link>
                {authCtx.isClientUser() && (
                  <div className={styles.dropdown_content}>
                    <Link className={styles.link} to={`/${EVENTS}`}>
                      All notes
                    </Link>
                  </div>
                )}
                {authCtx.isSupportForEntertainment() && (
                  <div className={styles.dropdown_content}>
                    <Link className={styles.link} to={`/${EVENTS}`}>
                      All events
                    </Link>
                    <Link className={styles.link} to={`/${EVENTS}/new`}>
                      Add event
                    </Link>
                  </div>
                )}
              </div>
            </li>
          )}

          <li>
            <div className={styles.dropdown}>
              <Link className={styles.dropdown} to={`/${LOGIN}`}>
                User
              </Link>
              <div className={styles.dropdown_content}>
                {authCtx.isLoggedIn() ? (
                  <>
                    <Link className={styles.link} to={`/`}>
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
    </header>
  );
}

export default NavigationBar;
