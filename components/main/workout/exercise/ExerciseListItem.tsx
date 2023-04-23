import { ListItem } from '@mui/material';
import ExerciseCard from './ExerciseCard';
import ExerciseInfo from '@/components/shared/interfaces/ExerciseInfo';

interface ExerciseListItemProps {
  exercise: ExerciseInfo;
  isOver: boolean;
  shouldShowCloseButton: boolean;
}

export default function ExerciseListItem({
  exercise,
  isOver,
  shouldShowCloseButton,
}: ExerciseListItemProps) {
  return (
    <ListItem>
      <ExerciseCard
        exercise={exercise}
        isOver={isOver}
        shouldShowCloseButton={shouldShowCloseButton}
      />
    </ListItem>
  );
}
