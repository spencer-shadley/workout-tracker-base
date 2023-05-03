import { useEffect, useMemo, useState } from 'react';
import {
  CreateWorkoutProvider,
  CreateWorkoutType,
  answerTypes,
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
  const [answerStyle, setAnswerStyle] = useState<string>(
    answerTypes[0].styleModifier
  );

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
    return {
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
      aiPreferences: {
        answerStyle,
        setAnswerStyle,
      },
    };
  }, [
    addedExerciseNames,
    answerStyle,
    currentHint,
    isLoading,
    searchText,
    searchedExerciseNameResults,
  ]);

  useEffect(() => {
    sessionStorage.setItem(
      'createWorkoutContext',
      JSON.stringify(createWorkoutContext)
    );
  }, [createWorkoutContext]);

  return (
    <CreateWorkoutProvider createWorkout={createWorkoutContext}>
      <CreateWorkoutContent />
    </CreateWorkoutProvider>
  );
}
