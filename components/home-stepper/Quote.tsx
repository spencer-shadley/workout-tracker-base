import { useOpenAi } from '@/api/hooks/openai/useOpenAi';
import RefreshIcon from '@mui/icons-material/Refresh';
import { Fade, IconButton, Skeleton, Tooltip, Typography } from '@mui/material';

interface QuoteProps {
  prompt: string;
}

export function Quote({ prompt }: QuoteProps) {
  const { data, refetch, isLoading } = useOpenAi<string>({ prompt, temperature: 1.5, skipCache: true });

  return (
    <Fade in>
      <span className="flex items-center max-h-fit overflow-auto">
        {isLoading ?
          <Skeleton width="50vw" />
          :
          <Typography color="white" variant="caption">
            {data}
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
              refetch();
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
