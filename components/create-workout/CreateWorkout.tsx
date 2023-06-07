import { useEffect, useMemo, useState } from 'react';

import { parseResponse, useSearchExercises } from '@/hooks/openai/useSearchExercises';
import useDebounce from '@/hooks/utils/useDebounce';

import { CreateWorkoutProvider, CreateWorkoutType } from './context/CreateWorkoutContextProvider';
import { getRandomHint } from './hints/hints';
import CreateWorkoutContent from './results/create-workout-content/CreateWorkoutContent';

export default function CreateWorkout() {
  const [searchText, setSearchText] = useState<string>(``);
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
    return parseResponse(rawSearchedExerciseNameResults ?? []) ?? [];
  }, [rawSearchedExerciseNameResults]);

  const createWorkoutContext: CreateWorkoutType = useMemo(() => {
    const context: CreateWorkoutType = {
      searchInput: {
        searchText,
        isSearching: isLoading,
        setSearchText,
        currentHint,
        searchedExerciseResults: searchedExerciseNameResults,
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
