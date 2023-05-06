import {
  DialogContentText,
  IconButton,
  Skeleton,
  Tooltip,
  Typography,
} from '@mui/material';
import { useCallback } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { useSelectedExercises } from '@/hooks/useSessionStorage';
import { logError } from '@/utils/logger';
import { useOpenAi } from '@/hooks/openai/useOpenAi';

interface SummaryDialogContentListItemContentProps {
  exerciseName: string;
}
export function SummaryDialogContentListItemContent({
  exerciseName,
}: SummaryDialogContentListItemContentProps) {
  const [exercises, setExercises] = useSelectedExercises();

  const removeExercise = useCallback(() => {
    const filteredExercises = exercises.filter((name) => name !== exerciseName);
    setExercises(filteredExercises);
  }, [exerciseName, exercises, setExercises]);

  const {
    data: description,
    error,
    isFetching,
    refetch,
  } = useOpenAi({
    prompt: `Give me a brief description for the exercise ${exerciseName}`,
    queryOptionOverrides: {
      enabled: false,
    },
  });

  function DescriptionText() {
    const text = (
      <DialogContentText>
        {description ? description : 'Click to load description'}
      </DialogContentText>
    );

    if (isFetching) {
      return <Skeleton>{text}</Skeleton>;
    }

    if (error) {
      logError(error);
      return <DialogContentText>Error fetching description</DialogContentText>;
    }

    return text;
  }

  return (
    <article
      className="w-full cursor-pointer"
      onClick={() => {
        refetch();
      }}
    >
      <span style={{ display: 'flex', alignItems: 'center' }}>
        <Typography variant="h5" flexGrow={1}>
          {exerciseName}
        </Typography>
        <Tooltip title={`Remove ${exerciseName}`} arrow>
          <IconButton
            onClick={() => {
              removeExercise();
            }}
          >
            <CloseIcon />
          </IconButton>
        </Tooltip>
      </span>
      <DescriptionText />
    </article>
  );
}
