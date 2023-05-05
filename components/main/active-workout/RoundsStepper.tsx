import { Step, StepButton, Stepper } from '@mui/material';
import { useTimeContext } from '../workout/context/TimeContextProvider';
import { useOptions } from '@/hooks/useLocalStorage';

export default function RoundsStepper() {
  const [workoutOptions] = useOptions();
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
