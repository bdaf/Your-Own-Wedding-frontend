import { ChangeEvent } from "react";
import "./SearchBar.module.css";
import styles from "./SearchBar.module.css";

interface Props {
  onChangeSearchBar: Function;
}
function SearchBar({ onChangeSearchBar }: Props) {
  function onChangeHandler(event: ChangeEvent<HTMLInputElement>): void {
    onChangeSearchBar(event.target.value);
  }

  return (
    <div className={styles.form} role="search">
      <input
        className={styles.search}
        id="search"
        type="search"
        placeholder="Search..."
        onChange={onChangeHandler}
      />
      <div className={styles.sort}>
        <span className={styles.header}>Sort</span>
        <select id="role" name="role" onChange={() => {}}>
          <option value="prize_from_low">Prize: Low to High</option>
          <option value="prize_from_high">Prize: High to Low</option>
        </select>
      </div>
    </div>
  );
}

export default SearchBar;
