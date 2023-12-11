import { Link, Outlet } from "react-router-dom";

import styles from "./NavigationBar.module.css";

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
              <Link className={styles.dropdown} to={"/se-offers"}>
                Offers
              </Link>
              <div className={styles.dropdown_content}>
                <Link className={styles.link} to={"/se-offers"}>
                  All offers
                </Link>
                <Link className={styles.link} to={"/se-offers/new"}>
                  New offer
                </Link>
              </div>
            </div>
          </li>
          <li>
            <Link to={"/se-offers/favourites"}>Favourites</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default NavigationBar;
