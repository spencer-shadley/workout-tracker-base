import { Card, Typography } from '@mui/material';
import AddWorkoutButton from '../shared/AddWorkoutButton';
import ThemeButton from '../shared/ThemeButton';

export default function Main() {
  return (
    <main>
      <Typography>
        Welcome back Spencer. What would you like to do today?
      </Typography>
      <Card>hi</Card>
      <ThemeButton />
      <AddWorkoutButton />
    </main>
  );
}
