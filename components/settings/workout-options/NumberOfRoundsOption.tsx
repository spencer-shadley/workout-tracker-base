import { useOptions } from '@/hooks/storage/useLocalStorage';
import { Slider, Typography } from '@mui/material';

export function NumberOfRoundsOption() {
  const [options, setOptions] = useOptions();

  return <>
    <Typography>
      Number of rounds
    </Typography>
    <Slider
      step={1}
      min={1}
      max={5}
      value={options.numberOfRounds}
      valueLabelDisplay="auto"
      valueLabelFormat={(value) => {
        return `${value} rounds`;
      }}
      onChange={(event, numberOfRounds) => {
        setOptions({
          ...options,
          numberOfRounds: numberOfRounds as number,
        });
      }} />
  </>;
}
