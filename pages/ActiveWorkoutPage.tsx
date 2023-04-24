import ActiveWorkout from '@/components/main/active-workout/ActiveWorkout';
import { WorkoutProvider } from '@/components/main/workout/context/WorkoutContextProvider';
import ExerciseInfo from '@/components/shared/interfaces/ExerciseInfo';
import { useRouter, withRouter } from 'next/router';
import { useState } from 'react';

export interface ActiveWorkoutPageProps {
  exercises: ExerciseInfo[];
  // workoutOptions: {

  // }
}

function ActiveWorkoutPage() {
  const { query } = useRouter();
  const props = JSON.parse(query.props as string) as ActiveWorkoutPageProps;
  const [exercises, setExercises] = useState<ExerciseInfo[]>(props.exercises);

  return (
    <WorkoutProvider
      workoutContext={{
        exercises,
        removeExercise: (exerciseName) => {
          setExercises(
            exercises.filter((exercise) => exercise.name !== exerciseName)
          );
        },
      }}
    >
      <ActiveWorkout />
    </WorkoutProvider>
  );
}

export default withRouter(ActiveWorkoutPage);
