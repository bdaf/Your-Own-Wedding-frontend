import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { useContext } from "react";
import WindowSizeContext from "../../store/window-size-context";

function valuetext(value: number) {
  return `${value}°C`;
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

export default function RangeSlider() {
  const windowSizeCtx = useContext(WindowSizeContext);
  const [value, setValue] = React.useState<number[]>([2000, 5000]);

  const handleChange = (event: Event, newValue: number | number[]) => {
    console.log(newValue);
    setValue(newValue as number[]);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Slider
        getAriaLabel={() => "Temperature range"}
        value={value}
        min={0}
        step={10}
        max={50000}
        marks={windowSizeCtx.isWindowLessWiderThan(500) ? miniMarks : maxMarks}
        onChange={handleChange}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
      />
    </Box>
  );
}
