import { sampleExercises } from '@/api/data/MockExerciseInfo';
import ActiveWorkout from '@/components/main/active-workout/ActiveWorkout';
import {
  WorkoutContextType,
  WorkoutProvider,
} from '@/components/main/workout/context/WorkoutContextProvider';
import { WorkoutOptionsProvider } from '@/components/main/workout/context/WorkoutOptionsContextProvider';
import ExerciseInfo from '@/components/shared/interfaces/ExerciseInfo';
import { withRouter } from 'next/router';
import { useState } from 'react';

function ActiveWorkoutPage() {
  const props = {
    exercises: sampleExercises.slice(0, 3),
    workoutOptions: {
      numberOfRounds: 3,
      restBetweenRoundsInSeconds: 20,
      restBetweenExercisesInSeconds: 15,
      exerciseDurationInSeconds: 45,
    },
  };
  const [exercises, setExercises] = useState<ExerciseInfo[]>(props.exercises);

  const workoutContext: WorkoutContextType = {
    exercises,
    addExercise: (exercise: ExerciseInfo) => {
      setExercises([...exercises, exercise]);
    },
    removeExercise: (exerciseName: string) => {
      setExercises(
        exercises.filter((exercise) => exercise.name !== exerciseName)
      );
    },
  };

  return (
    <WorkoutProvider workoutContext={workoutContext}>
      <WorkoutOptionsProvider
        workoutOptionsContext={{ workoutOptions: { ...props.workoutOptions } }}
      >
        <ActiveWorkout />
      </WorkoutOptionsProvider>
    </WorkoutProvider>
  );
}

export default withRouter(ActiveWorkoutPage);
