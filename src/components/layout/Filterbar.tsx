import PrizeSlider from "../ui/PrizeSlider";
import styles from "./Filterbar.module.css";

function Filterbar() {
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
      <PrizeSlider />
    </div>
  );
}

export default Filterbar;
