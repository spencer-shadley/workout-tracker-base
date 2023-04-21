import { InfoOutlined } from '@mui/icons-material';
import { ListItem, IconButton } from '@mui/material';
import ExerciseCard from './ExerciseCard';
import ExerciseInfo from '@/components/shared/ExerciseInfo';
import { Draggable } from 'react-beautiful-dnd';

interface ExerciseListItemProps {
  exercise: ExerciseInfo;
  index: number;
}

export default function ExerciseListItem({
  exercise,
  index,
}: ExerciseListItemProps) {
  return (
    <Draggable key={exercise.name} draggableId={exercise.name} index={index}>
      {(provided) => (
        <ListItem
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          secondaryAction={
            <IconButton aria-label="comment">
              <InfoOutlined />
            </IconButton>
          }
        >
          <ExerciseCard exercise={exercise} />
        </ListItem>
      )}
    </Draggable>
  );
}
