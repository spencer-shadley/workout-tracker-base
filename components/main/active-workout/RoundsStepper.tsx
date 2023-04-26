import { Step, StepButton, Stepper } from '@mui/material';
import { useWorkoutOptionsContext } from '../workout/context/WorkoutOptionsContextProvider';
import { useTimeContext } from '../workout/context/TimeContextProvider';

export default function RoundsStepper() {
  const { workoutOptions } = useWorkoutOptionsContext();
  const { numberOfRounds } = workoutOptions;

  const { currentRound, setCurrentRound } = useTimeContext();

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
