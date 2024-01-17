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
      value: "prize_from_low",
      function: sortByPrizeFromLowest,
      text: "Prize: Low to High",
    },
    {
      value: "prize_from_high",
      function: sortByPrizeFromHighest,
      text: "Prize: High to Low",
    },
    {
      value: "created_at_from_new",
      function: sortByCreatedAtFromNewest,
      text: "Newest offers",
    },
    {
      value: "created_at_from_old",
      function: sortByCreatedAtFromOldest,
      text: "Oldest offers",
    },
  ];
  const [sortOption, setSortOption] = useState(sortOptions[0]);
  const [searchText, setSearchText] = useState("");

  function sortObjectsByField(
    objects: any[],
    fieldName: string,
    isFirstGrater: boolean
  ): any[] {
    return objects.sort((a: any, b: any) => {
      if (a[fieldName] > b[fieldName]) return isFirstGrater ? 1 : 0;
      else if (a[fieldName] < b[fieldName]) return isFirstGrater ? 0 : 1;
      else return 0;
    });
  }
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
