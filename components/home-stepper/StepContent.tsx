import { Button, Typography } from '@mui/material';
import Link from 'next/link';
import { StepInfo } from './stepInfo';
import { Quote } from './Quote';
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
        maxWidth: '100%',
        overflow: 'hidden',
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
            padding: '50px',
          }}
        >
          <Link href="/StartWorkoutPage">
            <Button variant="outlined">
              <Typography variant="h2">{step.title}</Typography>
            </Button>
          </Link>
          <Quote prompt={`${step.aiPrompt}`} />
        </div>
      ) : null}
    </div>
  );
}
