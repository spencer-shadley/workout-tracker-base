import { useOptions } from '@/hooks/storage/useLocalStorage';
import { Slider, Typography } from '@mui/material';

import { makeMinuteMarks } from './WorkoutOptionsContent';

export function ExerciseDurationOption() {
  const [options, setOptions] = useOptions();

  return <>
    <Typography>
      Exercise duration
    </Typography>
    <Slider
      step={5}
      value={options.exerciseDurationInSeconds}
      min={5}
      max={120}
      valueLabelDisplay="auto"
      marks={makeMinuteMarks()}
      valueLabelFormat={(value) => {
        return `${value}s`;
      }}
      onChange={(event, updated) => {
        setOptions({
          ...options,
          exerciseDurationInSeconds: updated as number,
        });
      }} />
  </>;
}
