import { Step, StepButton, Stepper, Typography } from '@mui/material';
import { useTimeContext } from '../workout/context/TimeContextProvider';
import { useOptions } from '@/hooks/storage/useLocalStorage';

export default function RoundsStepper() {
  const [workoutOptions] = useOptions();
  const { numberOfRounds } = workoutOptions;

  const { currentRound, setCurrentRound } = useTimeContext();

  const rounds: number[] = [];
  for (let i = 0; i < numberOfRounds; i++) {
    rounds.push(i);
  }

  return (
    <Stepper activeStep={currentRound ?? 0} nonLinear className="mb-2">
      {rounds.map((round) => {
        return (
          <Step key={round}>
            <StepButton onClick={() => setCurrentRound(round)}>
              <Typography className="text-gray-100">
                Round {round + 1}
              </Typography>
            </StepButton>
          </Step>
        );
      })}
    </Stepper>
  );
}
