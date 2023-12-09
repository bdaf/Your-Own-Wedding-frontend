import "./SearchBar.module.css";
import styles from "./SearchBar.module.css";

function SearchBar() {
  return (
    <form className={styles.form} onSubmit={() => {}} role="search">
      <input
        className={styles.input}
        id="search"
        type="search"
        placeholder="Search..."
      />
    </form>
  );
}

export default SearchBar;
