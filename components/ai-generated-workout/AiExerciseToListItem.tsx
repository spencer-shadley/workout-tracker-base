import { Avatar, ListItem, ListItemAvatar } from '@mui/material';

import AIExercise from '../../api/data/AIExercise';
import ExerciseListItemContent from './ExerciseListItemContent';

interface AiExerciseToListItemProps {
  aiExercise: AIExercise;
  stepNumber: number;
}

export default function AiExerciseToListItem({
  aiExercise,
  stepNumber,
}: AiExerciseToListItemProps) {
  return aiExercise ?
    <ListItem key={Math.random()}>
      <ListItemAvatar>
        <Avatar>{stepNumber++}</Avatar>
      </ListItemAvatar>
      <ExerciseListItemContent {...aiExercise} />
    </ListItem>
    : null;
}
