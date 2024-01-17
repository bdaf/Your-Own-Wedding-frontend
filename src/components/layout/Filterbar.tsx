import { useContext, useState } from "react";
import PrizeSlider from "../ui/PrizeSlider";
import styles from "./Filterbar.module.css";
import WindowSizeContext from "../../store/window-size-context";
import FlashMessagesContext, {
  WARNING_FLASH_TYPE,
} from "../../store/flash-messages-context";

const MIN_VALUE = 0;
const MAX_VALUE = 50000;

function Filterbar() {
  const windowSizeCtx = useContext(WindowSizeContext);
  const flashMsgCtx = useContext(FlashMessagesContext);
  const [prizeFilterValue, setPrizeFilterValue] = useState<number[]>([
    2000, 5000,
  ]);

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

  const handleMinInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(prizeFilterValue);
    setMessageifFromHigherThanTo(
      Number(event.target.value),
      prizeFilterValue[1]
    );
    setPrizeFilterValue([
      event.target.value === "" ? 0 : Number(event.target.value),
      prizeFilterValue[1],
    ]);
  };
  const handleMaxInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(prizeFilterValue);
    setMessageifFromHigherThanTo(
      prizeFilterValue[0],
      Number(event.target.value)
    );
    setPrizeFilterValue([
      prizeFilterValue[0],
      event.target.value === "" ? 0 : Number(event.target.value),
    ]);
  };

  const handleBlur = () => {
    if (prizeFilterValue[0] < MIN_VALUE) {
      setPrizeFilterValue([MIN_VALUE, prizeFilterValue[1]]);
    } else if (prizeFilterValue[1] > MAX_VALUE) {
      setPrizeFilterValue([prizeFilterValue[0], MAX_VALUE]);
    }
  };

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
          <input
            value={prizeFilterValue[0]}
            className={styles.prize}
            placeholder="0"
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
            value={prizeFilterValue[1]}
            className={styles.prize}
            placeholder="50000"
            type="number"
            onBlur={handleBlur}
            onChange={handleMaxInputChange}
          />
        </div>
      </div>
      <PrizeSlider
        setSliderValue={setPrizeFilterValue}
        sliderValue={prizeFilterValue}
      />
    </div>
  );
}

export default Filterbar;
