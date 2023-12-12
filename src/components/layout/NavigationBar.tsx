import { Link } from "react-router-dom";

import styles from "./NavigationBar.module.css";
import { SE_OFFERS } from "../../constants";

function NavigationBar() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>Your Own Wedding</div>
      <nav>
        <ul>
          <li>
            <Link to={"/"}>Home</Link>
          </li>
          <li>
            <div className={styles.dropdown}>
              <Link className={styles.dropdown} to={`/${SE_OFFERS}`}>
                Offers
              </Link>
              <div className={styles.dropdown_content}>
                <Link className={styles.link} to={`/${SE_OFFERS}`}>
                  All offers
                </Link>
                <Link className={styles.link} to={`/${SE_OFFERS}/new`}>
                  New offer
                </Link>
              </div>
            </div>
          </li>
          <li>
            <Link to={`/${SE_OFFERS}/favourites`}>Favourites</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default NavigationBar;
