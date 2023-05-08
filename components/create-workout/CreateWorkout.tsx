import { useEffect, useMemo, useState } from 'react';
import {
  CreateWorkoutProvider,
  CreateWorkoutType,
} from './context/CreateWorkoutContextProvider';
import useDebounce from '@/hooks/useDebounce';
import CreateWorkoutContent from './results/create-workout-content/CreateWorkoutContent';
import {
  useSearchExercises,
  responseToArray,
} from '@/hooks/openai/useSearchExercises';
import { getRandomHint } from './hints';

export default function CreateWorkout() {
  const [searchText, setSearchText] = useState<string>('');
  const [currentHint, setCurrentHint] = useState<string>(getRandomHint());

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

  const createWorkoutContext: CreateWorkoutType = useMemo(() => {
    const context: CreateWorkoutType = {
      searchInput: {
        searchText,
        isSearching: isLoading,
        setSearchText,
        currentHint,
        searchedExerciseNameResults,
      },
    };
    return context;
  }, [currentHint, isLoading, searchText, searchedExerciseNameResults]);

  return (
    <CreateWorkoutProvider createWorkout={createWorkoutContext}>
      <CreateWorkoutContent />
    </CreateWorkoutProvider>
  );
}
