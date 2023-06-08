import { useEffect, useMemo, useState } from 'react';
import { useDebounce } from 'usehooks-ts';

import { parseResponse, useSearchExercises } from '@/hooks/openai/useSearchExercises';

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

  const searchedExerciseResults = useMemo(() => {
    return parseResponse(rawSearchedExerciseNameResults ?? []) ?? [];
  }, [rawSearchedExerciseNameResults]);

  const createWorkoutContext: CreateWorkoutType = useMemo(() => {
    const context: CreateWorkoutType = {
      searchInput: {
        searchText,
        isSearching: isLoading,
        setSearchText,
        currentHint,
        searchedExerciseResults,
      },
    };
    return context;
  }, [currentHint, isLoading, searchText, searchedExerciseResults]);

  return (
    <CreateWorkoutProvider createWorkout={createWorkoutContext}>
      <CreateWorkoutContent />
    </CreateWorkoutProvider>
  );
}
