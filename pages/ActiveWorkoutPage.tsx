/* eslint-disable @typescript-eslint/no-empty-function */
import { sampleExercises } from '@/api/data/MockExerciseInfo';
import {
  CreateWorkoutProvider,
  CreateWorkoutType,
} from '@/components/create-workout/context/CreateWorkoutContextProvider';
import ActiveWorkout from '@/components/main/active-workout/ActiveWorkout';
import {
  WorkoutContextType,
  WorkoutProvider,
} from '@/components/main/workout/context/WorkoutContextProvider';
import { WorkoutOptionsProvider } from '@/components/main/workout/context/WorkoutOptionsContextProvider';
import ExerciseInfo from '@/components/shared/interfaces/ExerciseInfo';
import { withRouter } from 'next/router';
import { useEffect, useState } from 'react';

const defaultContext: CreateWorkoutType = {
  // TODO: move to provider
  searchInput: {
    isSearching: false,
    searchText: '',
    setSearchText: () => {},
    currentHint: '',
    searchedExerciseNameResults: [],
  },
  exercisesCart: {
    addedExerciseNames: [],
    addExerciseNameToCart: () => {},
    removeExerciseNameFromCart: () => {},
  },
  aiPreferences: {
    answerStyle: '',
    setAnswerStyle: () => {},
  },
};

function ActiveWorkoutPage() {
  const [createWorkoutContext, setCreateWorkoutContext] =
    useState<CreateWorkoutType>(defaultContext);

  useEffect(() => {
    try {
      const createWorkoutContextRaw =
        sessionStorage.getItem('createWorkoutContext') ?? ''; // TODO: export key
      const parsedContext: CreateWorkoutType = JSON.parse(
        createWorkoutContextRaw
      );
      setCreateWorkoutContext(parsedContext);
      console.log('parsedContext', parsedContext);
    } catch (e) {
      console.error(e);
    }
  }, []);

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

  // TODO make new provider
  return (
    <CreateWorkoutProvider createWorkout={createWorkoutContext}>
      <WorkoutProvider workoutContext={workoutContext}>
        <WorkoutOptionsProvider
          workoutOptionsContext={{
            workoutOptions: { ...props.workoutOptions },
          }}
        >
          <ActiveWorkout />
        </WorkoutOptionsProvider>
      </WorkoutProvider>
    </CreateWorkoutProvider>
  );
}

export default withRouter(ActiveWorkoutPage);
