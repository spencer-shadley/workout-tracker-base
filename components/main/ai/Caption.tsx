import { askQuestion, askQuestionProps } from '@/components/api/openai';
import { Fade, Grow, IconButton, Typography } from '@mui/material';
import { useState, useEffect, useCallback } from 'react';
import RefreshIcon from '@mui/icons-material/Refresh';

interface CaptionProps extends askQuestionProps {
  loadingText?: string;
}

export default function Caption({
  loadingText,
  ...askQuestionProps
}: CaptionProps) {
  const [quote, setQuote] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const updateQuestion = useCallback(
    (updateProps?: Partial<askQuestionProps>) => {
      setIsLoading(true);
      askQuestion({ ...askQuestionProps, ...updateProps }).then((response) => {
        setQuote(response);
        setIsLoading(false);
      });
    },
    [askQuestionProps]
  );

  useEffect(() => {
    if (quote === '') {
      updateQuestion();
    }
  }, [quote, updateQuestion]);

  const shouldShow = !!(quote || loadingText);

  return (
    <Fade in={shouldShow}>
      <Grow in={shouldShow}>
        <span>
          <Typography color="white" variant="caption">
            {quote ?? loadingText}
          </Typography>
          <IconButton
            onClick={() => {
              updateQuestion({
                question: `${askQuestionProps.question}. This time make it something new.`,
                temperature: 0.9,
              });
            }}
          >
            <Fade in={!isLoading}>
              <RefreshIcon sx={{ color: 'white' }} />
            </Fade>
          </IconButton>
        </span>
      </Grow>
    </Fade>
  );
}
