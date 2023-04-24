import { useWorkoutOptionsContext } from '../workout/context/WorkoutOptionsContextProvider';
import Exercises from '../workout/exercise/Exercises';
import { Button, ButtonGroup, Card, Typography } from '@mui/material';
import { WorkoutOptions } from '@/pages/ActiveWorkoutPage';
import { useWorkoutContext } from '../workout/context/WorkoutContextProvider';
import Countdown, { CountdownRenderProps, CountdownApi } from 'react-countdown';

function calculateTimeRemainingInMilliseconds(
  workoutOptions: WorkoutOptions,
  numberOfExercises: number
) {
  const secondsPerRound =
    numberOfExercises *
      (workoutOptions.exerciseDurationInSeconds +
        workoutOptions.restBetweenExercisesInSeconds) +
    workoutOptions.restBetweenRoundsInSeconds -
    workoutOptions.restBetweenExercisesInSeconds;
  return (
    (secondsPerRound * workoutOptions.numberOfRounds -
      workoutOptions.restBetweenRoundsInSeconds) *
    1000
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
      <Card>
        <ButtonGroup>
          <Button>Start</Button>
          <Button onClick={() => countdown.getApi().pause()}>Pause</Button>
          <Button>Stop</Button>
        </ButtonGroup>

        <Countdown
          onPause={() => console.log('paused')}
          date={
            Date.now() +
            calculateTimeRemainingInMilliseconds(
              workoutOptions,
              exercises.length
            )
          }
          intervalDelay={0}
          precision={3}
          renderer={Timer}
        />

        {/* <Typography>
        Time remaining{' '}
        {calculateTimeRemaining(workoutOptions, exercises.length)} seconds
      </Typography> */}
        {JSON.stringify(workoutOptions)}
      </Card>
      <Exercises />
    </>
  );
}

function Timer({
  hours,
  minutes,
  seconds,
  completed,
  milliseconds,
}: CountdownRenderProps) {
  console.log(hours, minutes, seconds, completed);
  if (completed) {
    // Render a completed state
    return <h1>done!</h1>;
  } else {
    // Render a countdown
    return (
      <>
        <Typography>{hours} hours</Typography>
        <Typography>{minutes} minutes</Typography>
        <Typography>{seconds} seconds</Typography>
        <Typography>{milliseconds} milliseconds</Typography>
      </>
    );
  }
}
