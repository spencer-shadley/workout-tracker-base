import { useOptions } from '@/hooks/storage/useLocalStorage';
import { Slider, Typography } from '@mui/material';

import { makeMinuteMarks } from './WorkoutOptionsContent';

export function RestBetweenRoundsOption() {
  const [options, setOptions] = useOptions();

  return <>
    <Typography>
      Rest between rounds
    </Typography>
    <Slider
      step={5}
      value={options.restBetweenRoundsInSeconds}
      min={0}
      max={300}
      valueLabelDisplay="auto"
      marks={makeMinuteMarks()}
      valueLabelFormat={(value) => {
        return `${value}s`;
      }}
      onChange={(event, restBetweenRounds) => {
        setOptions({
          ...options,
          restBetweenRoundsInSeconds: restBetweenRounds as number,
        });
      }} />
  </>;
}
