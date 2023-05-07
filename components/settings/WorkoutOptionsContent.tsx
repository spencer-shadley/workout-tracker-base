import { Slider, Typography } from '@mui/material';
import { useOptions } from '@/hooks/useLocalStorage';

function makeMinuteMarks() {
  const maxMinutes = 4;
  const marks = [];
  for (let i = 1; i <= maxMinutes; i++) {
    marks.push({ value: i * 60, label: `${i}m` });
  }
  return marks;
}

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
