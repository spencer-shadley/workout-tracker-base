import ExerciseInfo from '@/components/shared/interfaces/ExerciseInfo';
import { PropsWithChildren, createContext, useContext } from 'react';
import { TimeSlot } from './TimeContextProvider';

export interface ActivityCardContextType {
  exercise?: ExerciseInfo;
  isDismissible: boolean;
  timeBucket: TimeSlot | undefined;
  progressPercent?: number;
}

export const ActivityCardContext = createContext<ActivityCardContextType>({
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

export const useExerciseCardContext = () => useContext(ActivityCardContext);

interface ActivityCardContextProviderProps extends PropsWithChildren {
  activityCardContext: ActivityCardContextType;
}

export const ActivityCardProvider = ({
  activityCardContext,
  children,
}: ActivityCardContextProviderProps) => (
  <ActivityCardContext.Provider value={activityCardContext}>
    {children}
  </ActivityCardContext.Provider>
);
