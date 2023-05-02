import { PropsWithChildren, createContext, useContext } from 'react';
import { WorkoutOptions } from '../WorkoutOptions';

export interface WorkoutOptionsContextType {
  workoutOptions: WorkoutOptions;
}

export const WorkoutOptionsContext = createContext<WorkoutOptionsContextType>({
  workoutOptions: {
    numberOfRounds: 0,
    restBetweenRoundsInSeconds: 0,
    restBetweenExercisesInSeconds: 0,
    exerciseDurationInSeconds: 0,
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
