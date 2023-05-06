import { Button, Fade, IconButton, Tooltip, Typography } from '@mui/material';
import Link from 'next/link';
import { StepInfo } from './stepInfo';
import { useCallback, useEffect, useState } from 'react';
import RefreshIcon from '@mui/icons-material/Refresh';
import { askQuestion } from '@/api/askQuestion';
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
  const [aiAnswer, setAiAnswer] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const updateQuestion = useCallback(() => {
    console.log('asking question');
    setIsLoading(true);
    const question = `${step.aiPrompt}`;
    askQuestion({ prompt: question, temperature: 1.5 })
      .then((response) => {
        setAiAnswer(response ?? undefined);
      })
      .finally(() => {
        setIsLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    updateQuestion();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
          <Fade in={!isLoading}>
            <span className="flex">
              <Typography color="white" variant="caption">
                {aiAnswer}
              </Typography>
              <IconButton
                onClick={() => {
                  updateQuestion();
                }}
              >
                <Tooltip title="Get a new answer">
                  <RefreshIcon sx={{ color: 'white' }} />
                </Tooltip>
              </IconButton>
            </span>
          </Fade>
        </div>
      ) : null}
    </div>
  );
}
