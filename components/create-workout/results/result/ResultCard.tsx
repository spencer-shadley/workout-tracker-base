import { PropsWithChildren } from 'react';

import { useExerciseContext } from '@/components/shared/ExerciseProvider';
import { Card } from '@mui/material';

export function ResultCard({ children }: PropsWithChildren) {
  const { exerciseName } = useExerciseContext();
  return (
    <Card key={exerciseName} sx={{ marginBottom: '10px' }}>
      {children}
    </Card>
  );
}
