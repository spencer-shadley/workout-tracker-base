import { createContext, PropsWithChildren, useContext } from 'react';

export interface WorkoutContextType {
  removeExercise: (exerciseName: string) => void;
  addExercise: (exercise: string) => void;
}

export const WorkoutContext = createContext<WorkoutContextType>({
  removeExercise: () => console.log(`removeExercise not implemented`),
  addExercise(): void {
    throw new Error(`Function not implemented.`);
  },
});

export const useWorkoutContext = () => useContext(WorkoutContext);

interface WorkoutContextProviderProps extends PropsWithChildren {
  workoutContext: WorkoutContextType;
}

export const WorkoutProvider = ({
  workoutContext,
  children,
}: WorkoutContextProviderProps) =>
  <WorkoutContext.Provider value={workoutContext}>
    {children}
  </WorkoutContext.Provider>
;
