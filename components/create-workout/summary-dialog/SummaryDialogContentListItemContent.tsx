import {
  DialogContentText,
  IconButton,
  Tooltip,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { logError } from '@/utils/error';
import CloseIcon from '@mui/icons-material/Close';
import { useCreateWorkoutContext } from '../context/CreateWorkoutContextProvider';
import { askQuestion } from '@/hooks/openai/askQuestion';

interface SummaryDialogContentListItemContentProps {
  exerciseName: string;
}
export function SummaryDialogContentListItemContent({
  exerciseName,
}: SummaryDialogContentListItemContentProps) {
  const { exercisesCart } = useCreateWorkoutContext();
  const { removeExerciseNameFromCart } = exercisesCart;
  const [description, setDescription] = useState<string | null>(null);

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
              removeExerciseNameFromCart(exerciseName);
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
