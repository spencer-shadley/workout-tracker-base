import { PropsWithChildren, createContext, useContext } from 'react';

export interface CreateWorkoutType {
  searchText: string;
  foundExerciseNames: string[];
}

export const CreateWorkout = createContext<CreateWorkoutType>({
  searchText: '',
  foundExerciseNames: [],
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
