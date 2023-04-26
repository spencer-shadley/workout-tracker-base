import { askQuestion, askQuestionProps } from '@/components/api/openai';
import { Fade, Grow, IconButton, Typography } from '@mui/material';
import { useState, useEffect, useCallback } from 'react';
import RefreshIcon from '@mui/icons-material/Refresh';

export default function Caption(props: askQuestionProps) {
  const [quote, setQuote] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const updateQuestion = useCallback(
    (updateProps?: Partial<askQuestionProps>) => {
      setIsLoading(true);
      askQuestion({ ...props, ...updateProps }).then((response) => {
        setQuote(response.data.choices[0].text ?? '');
        setIsLoading(false);
      });
    },
    [props]
  );

  useEffect(() => {
    updateQuestion();
  }, [props, updateQuestion]);

  return (
    <Fade in={!!quote}>
      <Grow in={!!quote}>
        <span>
          <Typography color="white" variant="caption">
            {quote}
          </Typography>
          <IconButton
            onClick={() => {
              updateQuestion({
                question: `${props.question}. This time make it something new.`,
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
