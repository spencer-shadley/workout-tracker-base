import { ListItem } from '@mui/material';
import ExerciseCard from './ExerciseCard';
import ExerciseInfo from '@/components/shared/ExerciseInfo';
import { useDrag } from 'react-dnd';

interface ExerciseListItemProps {
  exercise: ExerciseInfo;
  isOver: boolean;
  index: number;
}

export default function ExerciseListItem({
  exercise,
  isOver,
  index,
}: ExerciseListItemProps) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'exercise',
    item: { ...exercise, index },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));
  return (
    <ListItem ref={drag}>
      <ExerciseCard
        exercise={exercise}
        isDragging={isDragging}
        isOver={isOver}
      />
    </ListItem>
  );
}
