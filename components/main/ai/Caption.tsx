import { askQuestion } from '@/components/api/openai';
import { Fade, Grow, Typography } from '@mui/material';
import { useState, useEffect } from 'react';

interface CaptionProps {
  prompt: string;
}

export default function Caption({ prompt }: CaptionProps) {
  const [quote, setQuote] = useState<string>('');

  useEffect(() => {
    askQuestion(prompt).then((response) => {
      setQuote(response.data.choices[0].text ?? '');
    });
  }, [prompt]);

  return (
    <Fade in={!!quote}>
      <Grow in={!!quote}>
        <Typography color="white" variant="caption">
          {quote}
        </Typography>
      </Grow>
    </Fade>
  );
}
