import {
  Avatar,
  Chip,
  DialogContent,
  DialogContentText,
  List,
  ListItem,
  ListItemAvatar,
  Typography,
} from '@mui/material';
import { useCreateWorkoutContext } from '../context/CreateWorkoutContextProvider';
import { useEffect, useState } from 'react';
import { askQuestion } from '@/components/api/openai';
import { logError } from '@/utils/error';

export function SummaryDialogContent() {
  const { exercisesCart } = useCreateWorkoutContext();
  const { addedExerciseNames } = exercisesCart;
  return (
    <DialogContent>
      <List>
        {addedExerciseNames.map((exerciseName, index) => (
          <SummaryDialogContentListItem
            key={exerciseName}
            exerciseName={exerciseName}
            exerciseNumber={index + 1}
          />
        ))}
      </List>
    </DialogContent>
  );
}

interface SummaryDialogContentListItemProps {
  exerciseNumber: number;
  exerciseName: string;
}

function SummaryDialogContentListItem({
  exerciseNumber,
  exerciseName,
}: SummaryDialogContentListItemProps) {
  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar>{exerciseNumber}</Avatar>
      </ListItemAvatar>
      <SummaryDialogContentListItemContent exerciseName={exerciseName} />
    </ListItem>
  );
}

interface SummaryDialogContentListItemContentProps {
  exerciseName: string;
}

function SummaryDialogContentListItemContent({
  exerciseName,
}: SummaryDialogContentListItemContentProps) {
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
      </span>
      <DialogContentText>{description ?? 'Loading...'}</DialogContentText>
    </article>
  );
}
