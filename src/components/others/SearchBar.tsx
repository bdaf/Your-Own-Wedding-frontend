import "./SearchBar.module.css";
import styles from "./SearchBar.module.css";

function SearchBar() {
  return (
    <div className={styles.search_div}>
      <form className={styles.form} onSubmit={() => {}} role="search">
        <input
          className={styles.input}
          id="search"
          type="search"
          placeholder="Search..."
        />
        <button className={styles.button} type="submit">
          Find
        </button>
      </form>
    </div>
  );
}

export default SearchBar;
