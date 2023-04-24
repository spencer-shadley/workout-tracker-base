import { WorkoutOptions } from '@/pages/ActiveWorkoutPage';
import { PropsWithChildren, createContext, useContext } from 'react';

export interface WorkoutOptionsContextType {
  workoutOptions: WorkoutOptions;
}

export const WorkoutOptionsContext = createContext<WorkoutOptionsContextType>({
  workoutOptions: {
    numberOfRounds: 0,
    restBetweenRounds: 0,
    restBetweenExercises: 0,
    exerciseDuration: 0,
  },
});

export const useWorkoutOptionsContext = () => useContext(WorkoutOptionsContext);

interface WorkoutOptionsContextProviderProps extends PropsWithChildren {
  workoutOptionsContext: WorkoutOptionsContextType;
}

export const WorkoutOptionsProvider = ({
  workoutOptionsContext,
  children,
}: WorkoutOptionsContextProviderProps) => (
  <WorkoutOptionsContext.Provider value={workoutOptionsContext}>
    {children}
  </WorkoutOptionsContext.Provider>
);
