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
        className={styles.input}
        id="search"
        type="search"
        placeholder="Search..."
        onChange={onChangeHandler}
      />
    </div>
  );
}

export default SearchBar;
