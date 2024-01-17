import { useContext } from "react";
import PrizeSlider from "../ui/PrizeSlider";
import styles from "./Filterbar.module.css";
import WindowSizeContext from "../../store/window-size-context";

function Filterbar() {
  const windowSizeCtx = useContext(WindowSizeContext);
  function getMarginBasedOnWindowSize(): string {
    return windowSizeCtx.isWindowLessWiderThan(505) ? "0.5rem" : "0";
  }

  return (
    <div className={styles.filter_container}>
      <div className={styles.filter}>
        <span className={styles.header}>City</span>
        <input className={styles.search} placeholder="Search" type="search" />
      </div>
      <div className={styles.filter}>
        <span className={styles.header}>Category</span>
        <button className={` btn--alt ${styles.btn}`}>Service</button>
        <button className={` btn--alt ${styles.btn}`}>Product</button>
        <button className={` btn--alt ${styles.btn}`}>Wedding</button>
        <button className={` btn--alt ${styles.btn}`}>Ceremony</button>
      </div>
      <div className={styles.filter}>
        <div
          className={styles.prize_container}
          style={{ marginBottom: getMarginBasedOnWindowSize() }}
        >
          <span className={styles.header}>Prize from</span>
          <input className={styles.prize} placeholder="0" type="number" />
        </div>
        <div
          className={styles.prize_container}
          style={{ marginTop: getMarginBasedOnWindowSize() }}
        >
          <span className={styles.header}>Prize to</span>
          <input className={styles.prize} placeholder="50000" type="number" />
        </div>
      </div>
      <PrizeSlider />
    </div>
  );
}

export default Filterbar;
