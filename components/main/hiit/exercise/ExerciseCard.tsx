import ExerciseInfo from '@/components/shared/ExerciseInfo';
import { Card, CardContent, Typography } from '@mui/material';
import dayjs from 'dayjs';
import ExerciseStatLabel from './ExerciseStatLabel';
import { DragSourceMonitor, useDrag } from 'react-dnd';
import itemTypes from '@/utils/itemType';

interface ExerciseCardProps {
  exercise: ExerciseInfo;
  isOver: boolean;
}

export default function ExerciseCard({ exercise, isOver }: ExerciseCardProps) {
  const [{ isDragging }, drag] = useDrag({
    type: itemTypes.EXERCISE_CARD,
    item: { exercise },
    collect: (monitor: DragSourceMonitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <Card
      ref={drag}
      style={{ width: '100dvw', opacity: isDragging ? 0.5 : undefined }}
      sx={{
        backgroundColor: isDragging && isOver ? 'lightblue' : undefined,
      }}
    >
      <CardContent>
        <Typography variant="h5" component="div">
          {exercise.name}
        </Typography>
        <ExerciseStatLabel
          data={exercise.description}
          beforeText=""
          afterText=""
        />
        <ExerciseStatLabel
          data={
            exercise.lastCompleted
              ? dayjs().to(dayjs(exercise.lastCompleted))
              : undefined
          }
          beforeText="Last completed"
          afterText=""
        />
        <ExerciseStatLabel
          data={exercise.numberOfTimesCompleted}
          beforeText="Completed"
          afterText="times"
        />
        <ExerciseStatLabel
          data={exercise.maxWeight}
          beforeText="Max weight"
          afterText="lbs"
        />
      </CardContent>
    </Card>
  );
}
