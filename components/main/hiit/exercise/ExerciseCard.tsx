import ExerciseInfo from '@/components/shared/ExerciseInfo';
import { Card, CardContent, Typography } from '@mui/material';
import dayjs from 'dayjs';
import ExerciseStatLabel from './ExerciseStatLabel';

interface ExerciseButtonProps {
  exercise: ExerciseInfo;
}

export default function ExerciseCard({ exercise }: ExerciseButtonProps) {
  return (
    <Card style={{ width: '100dvw' }}>
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
