import { ListItem } from '@mui/material';
import ExerciseCard from './ExerciseCard';
import ExerciseInfo from '@/components/shared/interfaces/ExerciseInfo';

// TODO: make this context
interface ExerciseListItemProps {
  exercise: ExerciseInfo | 'rest';
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
