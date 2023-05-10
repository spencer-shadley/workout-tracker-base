import { PropsWithChildren, createContext, useContext } from 'react';
import { ActivityType, TimeSlot } from './TimeContextProvider';

export interface ActivityCardContextType {
  exerciseName?: string;
  isDismissible: boolean;
  timeBucket: TimeSlot | undefined;
  isExerciseActive: boolean;
  progressPercent: number | null;
  activityType: ActivityType;
}

export const ActivityCardContext = createContext<ActivityCardContextType>({
  isDismissible: false,
  isExerciseActive: false,
  progressPercent: 0,
  timeBucket: {
    remainingTimeInSeconds: 0,
    startTimeInSeconds: 0,
    endTimeInSeconds: 0,
    isActive: false,
    containerRound: 0,
    exerciseType: 'exercise',
  },
  activityType: 'exercise',
});

export const useActivityCardContext = () => useContext(ActivityCardContext);

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
