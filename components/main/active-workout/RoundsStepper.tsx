import { useOptions } from '@/hooks/storage/useLocalStorage';
import { IconButton, Step, StepLabel, Stepper, useTheme } from '@mui/material';

import { useTimeContext } from '../workout/context/TimeContextProvider';

export default function RoundsStepper() {
  const theme = useTheme();
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
            <StepLabel onClick={() => setCurrentRound(round)} StepIconProps={{
              icon: <IconButton sx={{ backgroundColor: theme.palette.secondary.main }} >
                {round}
              </IconButton>
            }}/>
          </Step>
        );
      })}
    </Stepper>
  );
}
