import { useEffect, useMemo, useState } from 'react';
import {
  CreateWorkoutProvider,
  CreateWorkoutType,
} from './context/CreateWorkoutContextProvider';
import useDebounce from '@/hooks/useDebounce';
import CreateWorkoutContent from './CreateWorkoutContent';
import {
  useSearchExercises,
  responseToArray,
} from '@/hooks/openai/useSearchExercises';
import { getRandomHint } from './hints';

export default function CreateWorkout() {
  const [searchText, setSearchText] = useState<string>('');
  const [currentHint, setCurrentHint] = useState<string>(getRandomHint());
  const [addedExerciseNames, setAddedExerciseNames] = useState<string[]>([]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentHint(getRandomHint());
    }, 10_000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const debouncedSearch = useDebounce<string>(searchText, 2000);
  const { isLoading, data: rawSearchedExerciseNameResults } =
    useSearchExercises(debouncedSearch);

  const searchedExerciseNameResults = useMemo(() => {
    return responseToArray(rawSearchedExerciseNameResults ?? '') ?? [];
  }, [rawSearchedExerciseNameResults]);

  const createWorkoutContext: CreateWorkoutType = {
    searchInput: {
      isSearching: isLoading,
      searchText,
      setSearchText,
      currentHint,
      searchedExerciseNameResults,
    },
    exercisesCart: {
      addedExerciseNames,
      addExerciseNameToCart: (exerciseName: string) => {
        setAddedExerciseNames([...addedExerciseNames, exerciseName]);
      },
      removeExerciseNameFromCart: (exerciseName: string) => {
        setAddedExerciseNames(
          addedExerciseNames.filter((name) => name !== exerciseName)
        );
      },
    },
  };

  return (
    <CreateWorkoutProvider createWorkout={createWorkoutContext}>
      <CreateWorkoutContent />
    </CreateWorkoutProvider>
  );
}
