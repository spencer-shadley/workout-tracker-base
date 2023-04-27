import { askQuestion } from '@/components/api/openai';
import { Fade, Grow, IconButton, Typography } from '@mui/material';
import { useState, useEffect, useCallback } from 'react';
import RefreshIcon from '@mui/icons-material/Refresh';
import { CreateCompletionRequest } from 'openai';

interface CaptionProps extends Partial<CreateCompletionRequest> {
  loadingText?: string;
  allowRetries?: boolean;
}

export default function Caption({
  loadingText,
  allowRetries,
  ...askQuestionProps
}: CaptionProps) {
  const [answer, setAnswer] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const updateQuestion = useCallback(
    (updateProps?: CaptionProps) => {
      setIsLoading(true);
      const question = `${askQuestionProps.prompt}. Give me something new every time I ask.`;
      askQuestion({ ...askQuestionProps, prompt: question, ...updateProps })
        .then((response) => {
          setAnswer(response ?? undefined);
        })
        .finally(() => {
          setIsLoading(false);
        });
    },
    [askQuestionProps]
  );

  useEffect(() => {
    updateQuestion();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const shouldShow = true;

  return (
    <Fade in={shouldShow}>
      <Grow in={shouldShow}>
        <span>
          <Typography color="white" variant="caption">
            {isLoading ? loadingText ?? 'Loading...' : answer}
          </Typography>
          {allowRetries !== false && (
            <IconButton
              onClick={() => {
                setAnswer(undefined);
                updateQuestion({
                  prompt: `${askQuestionProps.prompt}. This time make it something new.`,
                  temperature: 0.9,
                });
              }}
            >
              <Fade in={!isLoading}>
                <RefreshIcon sx={{ color: 'white' }} />
              </Fade>
            </IconButton>
          )}
        </span>
      </Grow>
    </Fade>
  );
}
