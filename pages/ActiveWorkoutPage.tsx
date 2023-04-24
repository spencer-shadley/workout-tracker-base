import ActiveWorkout from '@/components/main/active-workout/ActiveWorkout';
import { WorkoutProvider } from '@/components/main/workout/context/WorkoutContextProvider';
import { WorkoutOptionsProvider } from '@/components/main/workout/context/WorkoutOptionsContextProvider';
import { sampleExercises } from '@/components/shared/data/MockExerciseInfo';
import ExerciseInfo from '@/components/shared/interfaces/ExerciseInfo';
import { useRouter, withRouter } from 'next/router';
import { useState } from 'react';

export interface ActiveWorkoutPageProps {
  exercises: ExerciseInfo[];
  workoutOptions: WorkoutOptions;
}

export interface WorkoutOptions {
  numberOfRounds: number;
  restBetweenRoundsInSeconds: number;
  restBetweenExercisesInSeconds: number;
  exerciseDurationInSeconds: number;
}

function ActiveWorkoutPage() {
  const { query } = useRouter();

  const props: ActiveWorkoutPageProps = query?.props
    ? (JSON.parse(query.props as string) as ActiveWorkoutPageProps)
    : {
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
