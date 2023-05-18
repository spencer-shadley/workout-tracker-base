import { useExerciseContext } from '@/components/shared/ExerciseProvider';
import { useOptions } from '@/hooks/storage/useLocalStorage';
import { logError } from '@/utils/logger';
import { Slider, Typography } from '@mui/material';

import { makeMinuteMarks } from './WorkoutOptionsContent';

export function RestBetweenExercisesOption() {
  const [options, setOptions] = useOptions();
  const { exerciseName } = useExerciseContext();
  if (exerciseName){
    logError('TODO: add edit support')
  }

  return <>
    <Typography>
      {exerciseName ? `Rest after ${exerciseName}` : "Rest between exercises"}
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
