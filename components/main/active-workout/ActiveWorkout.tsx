import { useWorkoutOptionsContext } from '../workout/context/WorkoutOptionsContextProvider';
import Exercises from '../workout/exercise/Exercises';
import { Button, ButtonGroup, Typography } from '@mui/material';
import { WorkoutOptions } from '@/pages/ActiveWorkoutPage';
import { useWorkoutContext } from '../workout/context/WorkoutContextProvider';

function calculateTimeRemaining(
  workoutOptions: WorkoutOptions,
  numberOfExercises: number
) {
  const timePerRound =
    numberOfExercises *
      (workoutOptions.exerciseDuration + workoutOptions.restBetweenExercises) +
    workoutOptions.restBetweenRounds -
    workoutOptions.restBetweenExercises;
  return (
    timePerRound * workoutOptions.numberOfRounds -
    workoutOptions.restBetweenRounds
  );
}

// linear progress per exercise
// stepper for rounds
// linear progress for everything

export default function ActiveWorkout() {
  const { workoutOptions } = useWorkoutOptionsContext();
  const { exercises } = useWorkoutContext();
  //   const {elapsedTime } = https://codesandbox.io/s/priceless-hill-2tbiq?fontsize=14&hidenavigation=1&theme=dark
  return (
    <>
      <ButtonGroup>
        <Button>Start</Button>
        <Button>Pause</Button>
        <Button>Stop</Button>
      </ButtonGroup>
      <Typography>
        Time remaining{' '}
        {calculateTimeRemaining(workoutOptions, exercises.length)} seconds
      </Typography>
      {JSON.stringify(workoutOptions)}
      <Exercises />
    </>
  );
}
