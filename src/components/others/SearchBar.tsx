import { ChangeEvent, useState } from "react";
import "./SearchBar.module.css";
import styles from "./SearchBar.module.css";
import { OfferModel } from "../Models";

interface Props {
  onChangeSearchBar: Function;
}
function SearchBar({ onChangeSearchBar }: Props) {
  const sortOptions = [
    {
      value: "less_expensive_to_expensive",
      function: sortByPrizeFromLowest,
      text: "Prize: Low to High",
    },
    {
      value: "expensive_to_less_expensive",
      function: sortByPrizeFromHighest,
      text: "Prize: High to Low",
    },
    {
      value: "newest_to_oldest",
      function: sortByCreatedAtFromNewest,
      text: "Newest offers",
    },
    {
      value: "oldest_to_newest",
      function: sortByCreatedAtFromOldest,
      text: "Oldest offers",
    },
  ];
  const [sortOption, setSortOption] = useState(sortOptions[0]);
  const [searchText, setSearchText] = useState("");

  function sortByCreatedAtFromNewest(offers: OfferModel[]): OfferModel[] {
    return offers.sort((a, b) => {
      if (a.created_at! < b.created_at!) return 1;
      else if (a.created_at! > b.created_at!) return -1;
      else return 0;
    });
  }
  function sortByCreatedAtFromOldest(offers: OfferModel[]): OfferModel[] {
    return offers.sort((a, b) => {
      if (a.created_at! > b.created_at!) return 1;
      else if (a.created_at! < b.created_at!) return -1;
      else return 0;
    });
  }
  function sortByPrizeFromHighest(offers: OfferModel[]): OfferModel[] {
    return offers.sort((a, b) => {
      if (a.prize! > b.prize!) return -1;
      else if (a.prize! < b.prize!) return 1;
      else return 0;
    });
  }
  function sortByPrizeFromLowest(offers: OfferModel[]): OfferModel[] {
    return offers.sort((a, b) => {
      if (a.prize! < b.prize!) return -1;
      else if (a.prize! > b.prize!) return 1;
      else return 0;
    });
  }

  function onChangeHandler(event: ChangeEvent<HTMLInputElement>): void {
    setSearchText(event.target.value);
    onChangeSearchBar(event.target.value, sortOption.function);
  }

  function setSortValueHandler(event: ChangeEvent<HTMLSelectElement>) {
    const sortOption = sortOptions.filter(
      (option) => option.value == event.target.value
    )[0];
    setSortOption(sortOption);
    onChangeSearchBar(searchText, sortOption.function);
  }

  return (
    <div className={styles.form} role="search">
      <input
        className={styles.search}
        id="search"
        type="search"
        placeholder="Search..."
        value={searchText}
        onChange={onChangeHandler}
      />
      <div className={styles.sort}>
        <span className={styles.header}>Sort</span>
        <select
          id="sort"
          name="sort"
          defaultValue={"newest_to_oldest"}
          onChange={setSortValueHandler}
        >
          {sortOptions.map((option, index) => (
            <option key={index} value={option.value}>
              {option.text}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default SearchBar;
