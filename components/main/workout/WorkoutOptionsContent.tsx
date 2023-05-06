import { Slider, Typography } from '@mui/material';
import { useOptions } from '@/hooks/useLocalStorage';
import { makeMinuteMarks } from './WorkoutOptionsDialog';

export function WorkoutOptionsContent() {
  const [options, setOptions] = useOptions();
  return (
    <>
      <Typography>Number of rounds</Typography>
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
        }}
      />

      <Typography>Rest between exercises</Typography>
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
        }}
      />

      <Typography>Rest between rounds</Typography>
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
        }}
      />
    </>
  );
}
