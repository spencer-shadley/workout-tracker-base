import { Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import { askQuestion } from '../api/openai';

export default function FitnessQuote() {
  const [quote, setQuote] = useState<string>('');

  useEffect(() => {
    askQuestion(
      'Give me a short quote about fitness or being healthy but just the quote and author parts'
    ).then((response) => {
      setQuote(response.data.choices[0].text ?? '');
    });
  });
  return quote ? (
    <Typography color="white" variant="caption">
      {quote}
    </Typography>
  ) : null;
}
