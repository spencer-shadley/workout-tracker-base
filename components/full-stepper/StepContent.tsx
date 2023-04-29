import { Button, Fade, Grow, IconButton, Typography } from '@mui/material';
import Link from 'next/link';
import { StepInfo } from './stepInfo';
import { useCallback, useEffect, useState } from 'react';
import { askQuestion } from '../api/openai';
import RefreshIcon from '@mui/icons-material/Refresh';

interface StepContentProps {
  activeStep: number;
  step: StepInfo;
  index: number;
}

const answersGiven: string[] = [];

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
    const question = `${
      step.aiPrompt
    }. Make sure your answer is not one of these answers: "${JSON.stringify(
      answersGiven
    )}"`;
    askQuestion({ prompt: question, temperature: 1 })
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
          <Fade in={!isLoading}>
            <Grow in={!isLoading}>
              <span>
                <Typography color="white" variant="caption">
                  {aiAnswer}
                </Typography>
                <IconButton
                  onClick={() => {
                    updateQuestion();
                  }}
                >
                  <Fade in={!isLoading}>
                    <RefreshIcon sx={{ color: 'white' }} />
                  </Fade>
                </IconButton>
              </span>
            </Grow>
          </Fade>
        </div>
      ) : null}
    </div>
  );
}
