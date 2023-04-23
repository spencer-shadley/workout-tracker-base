import ExerciseInfo from '@/components/shared/interfaces/ExerciseInfo';
import { PropsWithChildren, createContext, useContext } from 'react';

export interface WorkoutContextType {
  exercises: ExerciseInfo[];
  title: string;
}

export const WorkoutContext = createContext<WorkoutContextType>({
  exercises: [],
  title: '',
});

export const useWorkoutContext = () => useContext(WorkoutContext);

interface WorkoutContextProviderProps extends PropsWithChildren {
  workoutContext: WorkoutContextType;
}

export const WorkoutProvider = ({
  workoutContext,
  children,
}: WorkoutContextProviderProps) => (
  <WorkoutContext.Provider value={workoutContext}>
    {children}
  </WorkoutContext.Provider>
);
