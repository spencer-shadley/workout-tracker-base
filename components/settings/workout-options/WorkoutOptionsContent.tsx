
import { ExerciseDurationOption } from './ExerciseDurationOption';
import { NumberOfRoundsOption } from './NumberOfRoundsOption';
import { RestBetweenExercisesOption } from './RestBetweenExercisesOption';
import { RestBetweenRoundsOption } from './RestBetweenRoundsOption';

export function makeMinuteMarks() {
  const maxMinutes = 4;
  const marks = [];
  for (let i = 1; i <= maxMinutes; i++) {
    marks.push({ value: i * 60, label: `${i}m` });
  }

  return marks;
}

export function WorkoutOptionsContent() {
  return (
    <>
      <NumberOfRoundsOption/>
      <ExerciseDurationOption/>
      <RestBetweenExercisesOption/>
      <RestBetweenRoundsOption />
    </>
  );
}

