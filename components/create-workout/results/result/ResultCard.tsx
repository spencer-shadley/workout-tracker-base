import { useExerciseContext } from '@/components/shared/ExerciseProvider';
import { Card } from '@mui/material';

import Result from './Result';

export function ResultCard() {
  const { exerciseName } = useExerciseContext();

  return (
    <Card key={exerciseName} sx={{ marginBottom: `10px` }}>
      <Result/>
    </Card>
  );
}
