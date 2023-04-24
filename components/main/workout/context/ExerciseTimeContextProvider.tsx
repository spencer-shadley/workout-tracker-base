import { PropsWithChildren, createContext, useContext } from 'react';

export interface ExerciseTimeContextType {
  elapsedExerciseTimeInMilliseconds: number;
}

export const ExerciseTimeContext = createContext<ExerciseTimeContextType>({
  elapsedExerciseTimeInMilliseconds: 0,
});

export const useExerciseTimeContext = () => useContext(ExerciseTimeContext);

interface ExerciseTimeContextProviderProps extends PropsWithChildren {
  exerciseTimeContext: ExerciseTimeContextType;
}

export const ExerciseTimeProvider = ({
  exerciseTimeContext,
  children,
}: ExerciseTimeContextProviderProps) => (
  <ExerciseTimeContext.Provider value={exerciseTimeContext}>
    {children}
  </ExerciseTimeContext.Provider>
);
