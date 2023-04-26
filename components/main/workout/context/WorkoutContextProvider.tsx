import ExerciseInfo from '@/components/shared/interfaces/ExerciseInfo';
import { PropsWithChildren, createContext, useContext } from 'react';

export interface WorkoutContextType {
  exercises: ExerciseInfo[];
  removeExercise: (exerciseName: string) => void;
  addExercise: (exercise: ExerciseInfo) => void;
}

export const WorkoutContext = createContext<WorkoutContextType>({
  exercises: [],
  removeExercise: () => console.log('removeExercise not implemented'),
  addExercise: function (): void {
    throw new Error('Function not implemented.');
  },
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
