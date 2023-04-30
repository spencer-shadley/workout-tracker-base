import { useEffect, useState } from 'react';
import {
  CreateWorkoutProvider,
  CreateWorkoutType,
} from './context/CreateWorkoutContextProvider';
import useDebounce from '@/hooks/useDebounce';
import searchExercises from '@/api/searchExercises';
import CreateWorkoutContent from './CreateWorkoutContent';

const hints = [
  'Biceps',
  'Bench press',
  'Legs',
  'Core',
  'High intensity workout',
  'Easy workout',
  'Exercises that only require my body',
  'Cardio workout',
  'Exercises that only use dumbbells',
];

function getRandomHint() {
  return `Try "${hints[Math.floor(Math.random() * hints.length)]}"`;
}

export default function CreateWorkout() {
  const [searchText, setSearchText] = useState<string>('');
  const [foundExerciseNames, setFoundExercises] = useState<string[]>([]);
  const [isSearching, setIsSearching] = useState<boolean>(false);
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

  useEffect(() => {
    async function search() {
      setIsSearching(true);
      const exercises = await searchExercises(debouncedSearch);
      setFoundExercises(exercises);
      setIsSearching(false);
    }

    if (debouncedSearch) {
      search();
    }
  }, [debouncedSearch]);

  const createWorkoutContext: CreateWorkoutType = {
    searchInput: {
      isSearching,
      searchText,
      searchedExerciseNameResults: foundExerciseNames,
      setSearchText,
      currentHint,
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
