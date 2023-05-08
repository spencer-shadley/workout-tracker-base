import { Card } from '@mui/material';
import { PropsWithChildren } from 'react';

interface ResultCardProps extends PropsWithChildren {
  exerciseName: string;
}
export function ResultCard({ exerciseName, children }: ResultCardProps) {
  return (
    <Card key={exerciseName} sx={{ marginBottom: '10px' }}>
      {children}
    </Card>
  );
}
