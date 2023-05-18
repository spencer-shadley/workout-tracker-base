import { useOptions } from '@/hooks/storage/useLocalStorage';
import { Slider, Typography } from '@mui/material';

import { makeMinuteMarks } from './WorkoutOptionsContent';

export function RestBetweenExercisesOption() {
  const [options, setOptions] = useOptions();

  return <>
    <Typography>
      Rest between exercises
    </Typography>
    <Slider
      step={5}
      value={options.restBetweenExercisesInSeconds}
      min={0}
      max={300}
      valueLabelDisplay="auto"
      marks={makeMinuteMarks()}
      valueLabelFormat={(value) => {
        return `${value}s`;
      }}
      onChange={(event, restBetweenExercises) => {
        setOptions({
          ...options,
          restBetweenExercisesInSeconds: restBetweenExercises as number,
        });
      }} />
  </>;
}
