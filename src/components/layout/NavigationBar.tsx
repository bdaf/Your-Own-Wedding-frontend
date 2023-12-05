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
            <Link to={"/se-offers"}>Offers</Link>
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
