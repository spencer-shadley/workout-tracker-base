import { Button, Typography } from '@mui/material';
import Link from 'next/link';
import { StepInfo } from './stepInfo';

interface StepContentProps {
  activeStep: number;
  step: StepInfo;
  index: number;
}

export default function StepContent({
  step,
  index,
  activeStep,
}: StepContentProps) {
  return (
    <div
      key={step.title}
      style={{
        height: '100%',
        alignItems: 'center',
      }}
    >
      {Math.abs(activeStep - index) <= 2 ? (
        <div
          style={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-evenly',
            flexGrow: 1,
          }}
        >
          <Link href="/StartWorkoutPage">
            <Button>
              <Typography variant="h1">{step.title}</Typography>
            </Button>
          </Link>
          <Typography color="white" variant="subtitle2">
            {step.quote}
          </Typography>
        </div>
      ) : null}
    </div>
  );
}
