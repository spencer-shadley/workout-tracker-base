import ExerciseInfo from '@/components/shared/ExerciseInfo';
import { Card, CardContent, Typography } from '@mui/material';
import dayjs from 'dayjs';
import ExerciseStatLabel from './ExerciseStatLabel';

interface ExerciseCardProps {
  exercise: ExerciseInfo;
  isDragging: boolean;
  isOver: boolean;
}

export default function ExerciseCard({
  exercise,
  isDragging,
  isOver,
}: ExerciseCardProps) {
  return (
    <Card
      style={{ width: '100dvw' }}
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
