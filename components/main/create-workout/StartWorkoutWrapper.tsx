import ExerciseInfo from '@/components/shared/interfaces/ExerciseInfo';
import { useState } from 'react';
import { Paper } from '@mui/material';
import { WorkoutProvider } from '../workout/context/WorkoutContextProvider';
import StartWorkoutContent from './StartWorkoutContent';

export default function StartWorkoutWrapper() {
  const [exercises, setExercises] = useState<ExerciseInfo[]>([]);

  return (
    <WorkoutProvider
      workoutContext={{
        exercises,
        addExercise: (exercise) => {
          setExercises([...exercises, exercise]);
        },
        removeExercise: (exerciseName) => {
          setExercises(
            exercises.filter((exercise) => exercise.name !== exerciseName)
          );
        },
      }}
    >
      <div
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          height: '100%',
        }}
      >
        <Paper
          sx={{
            margin: 2,
            padding: 2,
            width: '100%',
            maxWidth: '500px',
            display: 'flex',
            flexDirection: 'column',
          }}
          elevation={5}
        >
          <StartWorkoutContent />
        </Paper>
      </div>
    </WorkoutProvider>
  );
}
