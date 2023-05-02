import ActiveWorkout from '@/components/main/active-workout/ActiveWorkout';
import { WorkoutProvider } from '@/components/main/workout/context/WorkoutContextProvider';
import { WorkoutOptionsProvider } from '@/components/main/workout/context/WorkoutOptionsContextProvider';
import { sampleExercises } from '@/components/shared/data/MockExerciseInfo';
import ExerciseInfo from '@/components/shared/interfaces/ExerciseInfo';
import { logError } from '@/utils/error';
import { useRouter, withRouter } from 'next/router';
import { useState } from 'react';

export interface WorkoutOptions {
  numberOfRounds: number;
  restBetweenRoundsInSeconds: number;
  restBetweenExercisesInSeconds: number;
  exerciseDurationInSeconds: number;
}

function ActiveWorkoutPage() {
  const { isFallback } = useRouter();

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

  if (isFallback) {
    logError('isFallback is true, cannot render ActiveWorkoutPage');
    return <h1>Fallback for active workout page</h1>;
  }

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
      <WorkoutOptionsProvider
        workoutOptionsContext={{ workoutOptions: { ...props.workoutOptions } }}
      >
        <ActiveWorkout />
      </WorkoutOptionsProvider>
    </WorkoutProvider>
  );
}

export default withRouter(ActiveWorkoutPage);
