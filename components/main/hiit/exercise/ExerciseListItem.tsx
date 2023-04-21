import { ListItem } from '@mui/material';
import ExerciseCard from './ExerciseCard';
import ExerciseInfo from '@/components/shared/ExerciseInfo';

interface ExerciseListItemProps {
  exercise: ExerciseInfo;
  isOver: boolean;
}

export default function ExerciseListItem({
  exercise,
  isOver,
}: ExerciseListItemProps) {
  return (
    <ListItem>
      <ExerciseCard exercise={exercise} isOver={isOver} />
    </ListItem>
  );
}
