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
        <input className={styles.search} placeholder="Search" type="search" />
      </div>
      <div className={styles.filter}>
        <span className={styles.header}>Prize</span>
        <input className={styles.search} placeholder="Search" type="search" />
      </div>
    </div>
  );
}

export default Filterbar;
