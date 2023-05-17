import { createContext, PropsWithChildren, useContext } from 'react';

import { ActivityType } from '../main/workout/context/TimeContextProvider';

export interface ExerciseContextType {
  exerciseName: string | null;
  activityType: ActivityType;
}

export const ExerciseContext = createContext<ExerciseContextType>({
  exerciseName: null,
  activityType: 'exercise',
});

export const useExerciseContext = () => useContext(ExerciseContext);

export const ExerciseProvider = ({ children, ...props }: PropsWithChildren<ExerciseContextType>) => {
  return (
    <ExerciseContext.Provider value={{ ...props }}>
      {children}
    </ExerciseContext.Provider>
  );
};
