import {
  DialogContentText,
  IconButton,
  Tooltip,
  Typography,
} from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { logError } from '@/utils/logger';
import CloseIcon from '@mui/icons-material/Close';
import { askQuestion } from '@/api/askQuestion';
import { useSelectedExercises } from '@/hooks/useSessionStorage';

interface SummaryDialogContentListItemContentProps {
  exerciseName: string;
}
export function SummaryDialogContentListItemContent({
  exerciseName,
}: SummaryDialogContentListItemContentProps) {
  const [exercises, setExercises] = useSelectedExercises();
  const [description, setDescription] = useState<string | null>(null);

  const removeExercise = useCallback(() => {
    const filteredExercises = exercises.filter((name) => name !== exerciseName);
    setExercises(filteredExercises);
  }, [exerciseName, exercises, setExercises]);

  useEffect(() => {
    askQuestion({
      prompt: `Give me a brief description for the exercise ${exerciseName}`,
    })
      .then((response) => {
        setDescription(response);
      })
      .catch((error) => {
        setDescription('Failed to load description');
        logError(error);
      });
  }, [exerciseName]);

  return (
    <article>
      <span style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
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
      <DialogContentText>{description ?? 'Loading...'}</DialogContentText>
    </article>
  );
}
