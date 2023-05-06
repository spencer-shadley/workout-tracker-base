import { Fade, IconButton, Tooltip, Typography } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import { useOpenAi } from '@/hooks/openai/useOpenAi';

interface QuoteProps {
  prompt: string;
}
export function Quote({ prompt }: QuoteProps) {
  const {
    data: aiAnswer,
    isFetching: isLoading,
    refetch: updateQuestion,
  } = useOpenAi({
    prompt,
    initialProps: {
      temperature: 1.5,
    },
  });

  return (
    <Fade in={!isLoading}>
      <span className="flex items-center">
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
  );
}
