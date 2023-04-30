import { PropsWithChildren, createContext, useContext } from 'react';

interface SearchInputType {
  searchText: string;
  setSearchText: (searchText: string) => void;
  searchedExerciseNameResults: string[];
  currentHint: string;
  isSearching: boolean;
}

interface ExercisesCartType {
  addedExerciseNames: string[];
  addExerciseNameToCart: (exerciseName: string) => void;
  removeExerciseNameFromCart: (exerciseName: string) => void;
}

export interface CreateWorkoutType {
  searchInput: SearchInputType;
  exercisesCart: ExercisesCartType;
}

export const CreateWorkout = createContext<CreateWorkoutType>({
  searchInput: {
    isSearching: false,
    searchText: '',
    currentHint: '',
    searchedExerciseNameResults: [],
    setSearchText: () => {
      console.error('set search text not set');
    },
  },
  exercisesCart: {
    addedExerciseNames: [],
    addExerciseNameToCart: () => {
      console.error('add exercise to cart not set');
    },
    removeExerciseNameFromCart: () => {
      console.error('remove exercise from cart not set');
    },
  },
});

export const useCreateWorkoutContext = () => useContext(CreateWorkout);

interface CreateWorkoutProviderProps extends PropsWithChildren {
  createWorkout: CreateWorkoutType;
}

export const CreateWorkoutProvider = ({
  createWorkout,
  children,
}: CreateWorkoutProviderProps) => (
  <CreateWorkout.Provider value={createWorkout}>
    {children}
  </CreateWorkout.Provider>
);
