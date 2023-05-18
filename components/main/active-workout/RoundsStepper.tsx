import { useOptions } from '@/hooks/storage/useLocalStorage';
import { Step, StepButton, Stepper } from '@mui/material';

import { useTimeContext } from '../workout/context/TimeContextProvider';

export default function RoundsStepper() {
  const [workoutOptions] = useOptions();
  const { numberOfRounds } = workoutOptions;

  const { currentRound, setCurrentRound } = useTimeContext();

  const rounds: number[] = [];
  for (let i = 0; i < numberOfRounds; i++) {
    rounds.push(i);
  }

  return (
    <Stepper activeStep={currentRound ?? 0} nonLinear className="mb-2" alternativeLabel>
      {rounds.map((round) => {
        return (
          <Step key={round}>
            <StepButton onClick={() => setCurrentRound(round)}/>
          </Step>
        );
      })}
    </Stepper>
  );
}
