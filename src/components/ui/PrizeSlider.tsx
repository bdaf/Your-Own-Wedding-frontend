import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { useContext } from "react";
import WindowSizeContext from "../../store/window-size-context";

interface Props {
  setSliderValue: Function;
  sliderValue: number[];
}

function valuetext(value: number) {
  return `${value} PLN`;
}

const maxMarks = [
  {
    value: 2000,
    label: "2000 PLN",
  },
  {
    value: 4000,
    label: "4000 PLN",
  },
  {
    value: 6000,
    label: "6000 PLN",
  },
  {
    value: 8000,
    label: "8000 PLN",
  },
];

const miniMarks = [
  {
    value: 0,
    label: "0 PLN",
  },
  {
    value: 10000,
    label: "10000 PLN",
  },
];

export default function RangeSlider({ setSliderValue, sliderValue }: Props) {
  const windowSizeCtx = useContext(WindowSizeContext);

  const handleSliderChange = (_event: Event, newValue: number | number[]) => {
    setSliderValue(newValue as number[]);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Slider
        getAriaLabel={() => "Prize range"}
        value={sliderValue}
        min={0}
        step={10}
        max={10000}
        marks={windowSizeCtx.isWindowLessWiderThan(505) ? miniMarks : maxMarks}
        onChange={handleSliderChange}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
      />
    </Box>
  );
}
