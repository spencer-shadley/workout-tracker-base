import ExerciseInfo from '@/components/shared/interfaces/ExerciseInfo';
import { PropsWithChildren, createContext, useContext } from 'react';
import { TimeSlot } from './TimeContextProvider';

export interface ExerciseCardContextType {
  exercise: ExerciseInfo;
  isDismissible: boolean;
  timeBucket: TimeSlot | undefined;
  progressPercent?: number;
}

export const ExerciseCardContext = createContext<ExerciseCardContextType>({
  exercise: {
    name: '',
  },
  isDismissible: false,
  timeBucket: {
    remainingTimeInMilliseconds: 0,
    startTimeInMilliseconds: 0,
    endTimeInMilliseconds: 0,
    isActive: false,
    containerRound: 0,
    exerciseType: 'exercise',
  },
});

export const useExerciseCardContext = () => useContext(ExerciseCardContext);

interface ExerciseCardContextProviderProps extends PropsWithChildren {
  exerciseCardContext: ExerciseCardContextType;
}

export const ExerciseCardProvider = ({
  exerciseCardContext,
  children,
}: ExerciseCardContextProviderProps) => (
  <ExerciseCardContext.Provider value={exerciseCardContext}>
    {children}
  </ExerciseCardContext.Provider>
);
