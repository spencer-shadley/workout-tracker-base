import { useOpenAi } from '@/api/hooks/openai/useOpenAi';
import RefreshIcon from '@mui/icons-material/Refresh';
import { Fade, IconButton, Skeleton, Tooltip, Typography } from '@mui/material';

interface QuoteProps {
  prompt: string;
}

export function Quote({ prompt }: QuoteProps) {
  const {
    data: aiAnswer,
    isFetching: isLoading,
    refetch: updateQuestion,
  } = useOpenAi(
    prompt,
    1.5,
  );

  return (
    <Fade in>
      <span className="flex items-center">
        {isLoading ?
          <Skeleton width="50vw" />
          :
          <Typography color="white" variant="caption">
            {aiAnswer}
          </Typography>
        }
        {isLoading ?
          <Skeleton
            variant="circular"
            width={20}
            height={20}
            sx={{ marginLeft: `5px` }}
          />
          :
          <IconButton
            disabled={isLoading}
            onClick={() => {
              updateQuestion();
            }}
          >
            <Tooltip title="Get a new answer">
              <RefreshIcon sx={{ color: `white` }} />
            </Tooltip>
          </IconButton>
        }
      </span>
    </Fade>
  );
}
