import { useWorkoutOptionsContext } from '../workout/context/WorkoutOptionsContextProvider';
import Exercises from '../workout/exercise/Exercises';
import {
  Button,
  Card,
  Step,
  StepButton,
  Stepper,
  Typography,
} from '@mui/material';
import { WorkoutOptions } from '@/pages/ActiveWorkoutPage';
import { useWorkoutContext } from '../workout/context/WorkoutContextProvider';
import { useEffect, useState } from 'react';
import { TimeProvider } from '../workout/context/TimeContextProvider';

function calculateWorkoutTimeInMilliseconds(
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
  const { numberOfRounds } = workoutOptions;
  const { exercises } = useWorkoutContext();
  const [currentRound, setCurrentRound] = useState<number>(0);
  const [timeElapsedInMilliseconds, setTimeElapsedInMilliseconds] =
    useState<number>(0);

  const millisecondsLeftInWorkout =
    calculateWorkoutTimeInMilliseconds(workoutOptions, exercises.length) -
    timeElapsedInMilliseconds;

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeElapsedInMilliseconds(timeElapsedInMilliseconds + 1000);
    }, 1000);
    return () => clearInterval(interval);
  }, [timeElapsedInMilliseconds]);

  return (
    <TimeProvider
      timeContext={{
        currentRound,
        timeElapsedInMilliseconds,
      }}
    >
      <Card>
        <Typography>
          Time left in workout{' '}
          {millisecondsToHumanReadable(millisecondsLeftInWorkout)}
        </Typography>
        <RoundsStepper
          currentRound={currentRound}
          numberOfRounds={numberOfRounds}
          setCurrentRound={setCurrentRound}
        />
        <div>
          <Button>start/pause</Button>
          <Button>reset</Button>
        </div>
      </Card>
      <Exercises />
    </TimeProvider>
  );
}

interface RoundsStepperProps {
  numberOfRounds: number;
  currentRound: number;
  setCurrentRound: (round: number) => void;
}

function RoundsStepper({
  numberOfRounds,
  currentRound,
  setCurrentRound,
}: RoundsStepperProps) {
  const rounds: number[] = [];
  for (let i = 0; i < numberOfRounds; i++) {
    rounds.push(i);
  }
  return (
    <Stepper activeStep={currentRound}>
      {rounds.map((round) => {
        return (
          <Step key={round}>
            <StepButton onClick={() => setCurrentRound(round)}>
              Round {round + 1}
            </StepButton>
          </Step>
        );
      })}
    </Stepper>
  );
}

function millisecondsToHumanReadable(milliseconds: number): string {
  const hoursRemaining = Math.floor(milliseconds / 1000 / 60 / 60);
  milliseconds -= hoursRemaining * 1000 * 60 * 60;

  const minutesRemaining = Math.floor(milliseconds / 1000 / 60);
  milliseconds -= minutesRemaining * 1000 * 60;

  const secondsRemaining = Math.floor(milliseconds / 1000);
  milliseconds -= secondsRemaining * 1000;

  return `${hoursRemaining} hours, ${minutesRemaining} minutes, ${secondsRemaining} seconds`;
}
