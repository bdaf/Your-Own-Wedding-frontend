import { useContext, useState } from "react";
import PrizeSlider from "../ui/PrizeSlider";
import styles from "./Filterbar.module.css";
import WindowSizeContext from "../../store/window-size-context";
import FlashMessagesContext, {
  WARNING_FLASH_TYPE,
} from "../../store/flash-messages-context";
import {
  EMPTY_FILTER_MODEL,
  FiltersModel,
  MAX_OFFER_PRIZE,
  MIN_OFFER_PRIZE,
  OFFER_CATEGORY_OPTIONS,
} from "../Models";

interface Props {
  findFilteredOffers: Function;
}

function Filterbar({ findFilteredOffers }: Props) {
  const windowSizeCtx = useContext(WindowSizeContext);
  const flashMsgCtx = useContext(FlashMessagesContext);
  const [filters, setFilters] = useState<FiltersModel>(EMPTY_FILTER_MODEL);

  function setFiltersAndClearFlash(filters: FiltersModel) {
    setFilters(filters);
    if (flashMsgCtx.getFlashMessage() == "Offers have been loaded") {
      flashMsgCtx.clearFlashMessage();
    }
  }

  function getMarginBasedOnWindowSize(): string {
    return windowSizeCtx.isWindowLessWiderThan(505) ? "0.5rem" : "0";
  }

  function setMessageifFromHigherThanTo(from: number, to: number): void {
    if (from > to) {
      flashMsgCtx.setFlashMessage(
        "Value 'from' cannot be higer than 'to'",
        WARNING_FLASH_TYPE
      );
    } else if (
      flashMsgCtx
        .getFlashMessage()
        .includes("Value 'from' cannot be higer than 'to'")
    ) {
      flashMsgCtx.clearFlashMessage();
    }
  }

  function setMessageifValueOutsideLimit(
    value: number[],
    limit: number[]
  ): void {
    console.log(value);
    console.log(limit);
    if (value[1] > limit[1] || value[0] < limit[0]) {
      flashMsgCtx.setFlashMessage(
        `Value cannot be outside range ${limit[0]} to ${limit[1]}`,
        WARNING_FLASH_TYPE
      );
    } else if (
      flashMsgCtx.getFlashMessage().includes("Value cannot be outside range")
    ) {
      flashMsgCtx.clearFlashMessage();
    }
  }

  const handleMinInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(filters.prize);
    setMessageifFromHigherThanTo(Number(event.target.value), filters.prize[1]);
    setFiltersAndClearFlash({
      ...filters,
      prize: [
        event.target.value === "" ? 0 : Number(event.target.value),
        filters.prize[1],
      ],
    });
  };

  const handleMaxInputChange = (event: React.ChangeEvent<any>) => {
    console.log(filters.prize);
    setMessageifFromHigherThanTo(filters.prize[0], Number(event.target.value));
    setFiltersAndClearFlash({
      ...filters,
      prize: [
        filters.prize[0],
        event.target.value === "" ? 0 : Number(event.target.value),
      ],
    });
  };

  function selectCategoryHandler(category: string): void {
    const lowerCaseCategory = category.toLowerCase();
    const newCategoryFiltersArray = [...filters.categories];
    if (newCategoryFiltersArray.includes(lowerCaseCategory)) {
      const categoryIndex = newCategoryFiltersArray.findIndex(
        (c) => c == lowerCaseCategory
      );
      newCategoryFiltersArray.splice(categoryIndex, 1);
    } else {
      newCategoryFiltersArray.push(lowerCaseCategory);
    }
    setFiltersAndClearFlash({
      ...filters,
      categories: newCategoryFiltersArray,
    });
  }

  function setCityOnClickHandler(
    event: React.ChangeEvent<HTMLInputElement>
  ): void {
    console.log(filters.address);
    setFiltersAndClearFlash({
      ...filters,
      address: event.target.value,
    });
  }

  return (
    <div className={styles.filter_container}>
      <div className={styles.filter}>
        <span className={styles.header}>City</span>
        <input
          className={styles.search}
          placeholder="Search"
          type="search"
          onChange={setCityOnClickHandler}
        />
      </div>
      <div className={styles.filter}>
        <span className={styles.header}>Category</span>
        {OFFER_CATEGORY_OPTIONS.map((category, index) => (
          <button
            key={index}
            type="button"
            className={` btn--alt ${styles.btn} ${
              filters.categories.includes(category.toLowerCase())
                ? `active`
                : ""
            }`}
            onClick={() => selectCategoryHandler(category)}
          >
            {category}
          </button>
        ))}
      </div>
      <div className={styles.filter}>
        <div
          className={styles.prize_container}
          style={{ marginBottom: getMarginBasedOnWindowSize() }}
        >
          <span className={styles.header}>Prize from</span>
          <input
            value={filters.prize[0]}
            className={styles.prize}
            placeholder={`${MIN_OFFER_PRIZE}...`}
            min={MIN_OFFER_PRIZE}
            max={MAX_OFFER_PRIZE}
            type="number"
            onChange={handleMinInputChange}
          />
        </div>
        <div
          className={styles.prize_container}
          style={{ marginTop: getMarginBasedOnWindowSize() }}
        >
          <span className={styles.header}>Prize to</span>
          <input
            value={filters.prize[1]}
            className={styles.prize}
            placeholder={`...${MAX_OFFER_PRIZE}`}
            type="number"
            onChange={handleMaxInputChange}
          />
        </div>
      </div>
      <button
        className={`${styles.find_button} btn`}
        onClick={() => findFilteredOffers(filters)}
      >
        Find offers
      </button>
      <PrizeSlider
        setSliderValue={(value: number[]) => {
          setFiltersAndClearFlash({ ...filters, prize: value });
        }}
        sliderValue={filters.prize}
      />
    </div>
  );
}

export default Filterbar;
