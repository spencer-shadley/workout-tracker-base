import ActiveWorkout from '@/components/main/active-workout/ActiveWorkout';
import { WorkoutProvider } from '@/components/main/workout/context/WorkoutContextProvider';
import { WorkoutOptionsProvider } from '@/components/main/workout/context/WorkoutOptionsContextProvider';
import { sampleExercises } from '@/components/shared/data/MockExerciseInfo';
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
