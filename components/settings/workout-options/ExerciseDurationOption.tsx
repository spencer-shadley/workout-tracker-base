import { useExerciseContext } from '@/components/shared/ExerciseProvider';
import { useOptions } from '@/hooks/storage/useLocalStorage';
import { logError } from '@/utils/logger';
import { Slider, Typography } from '@mui/material';

import { makeMinuteMarks } from './WorkoutOptionsContent';

export function ExerciseDurationOption() {
  const [options, setOptions] = useOptions();
  const { exerciseName } = useExerciseContext();
  if (exerciseName){
    logError('TODO: add edit support')
  }

  return <>
    <Typography>
      {`${exerciseName ? `${exerciseName}` : `Exercise`} duration`}
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
