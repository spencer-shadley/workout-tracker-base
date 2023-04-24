import { Step, StepButton, Stepper } from '@mui/material';

interface RoundsStepperProps {
  numberOfRounds: number;
  currentRound: number;
  setCurrentRound: (round: number) => void;
}

export default function RoundsStepper({
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
