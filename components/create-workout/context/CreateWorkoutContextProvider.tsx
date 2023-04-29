import { PropsWithChildren, createContext, useContext } from 'react';

interface SearchInputType {
  searchText: string;
  foundExerciseNames: string[];
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
  searchInput: { searchText: '', foundExerciseNames: [] },
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

export const useCreateWorkout = () => useContext(CreateWorkout);

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
