import { Button, Typography } from '@mui/material';
import Link from 'next/link';
import { StepInfo } from './stepInfo';
import { Quote } from './Quote';
import RectangleBouncer from '../shared/RectangleBouncer';

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
  const { title, aiPrompt, url } = step;

  return (
    <div
      key={title}
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
          <RectangleBouncer>
            <Link href={url}>
              <Button variant="outlined">
                <Typography variant="h2">{title}</Typography>
              </Button>
            </Link>
          </RectangleBouncer>
          <Quote prompt={aiPrompt} />
        </div>
      ) : null}
    </div>
  );
}
