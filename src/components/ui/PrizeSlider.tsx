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
    value: 10000,
    label: "10000 PLN",
  },
  {
    value: 20000,
    label: "20000 PLN",
  },
  {
    value: 30000,
    label: "30000 PLN",
  },
  {
    value: 40000,
    label: "40000 PLN",
  },
];

const miniMarks = [
  {
    value: 0,
    label: "0 PLN",
  },
  {
    value: 50000,
    label: "50000 PLN",
  },
];

export default function RangeSlider({ setSliderValue, sliderValue }: Props) {
  const windowSizeCtx = useContext(WindowSizeContext);

  const handleSliderChange = (_event: Event, newValue: number | number[]) => {
    console.log(sliderValue);
    setSliderValue(newValue as number[]);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Slider
        getAriaLabel={() => "Prize range"}
        value={sliderValue}
        min={0}
        step={10}
        max={50000}
        marks={windowSizeCtx.isWindowLessWiderThan(505) ? miniMarks : maxMarks}
        onChange={handleSliderChange}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
      />
    </Box>
  );
}
