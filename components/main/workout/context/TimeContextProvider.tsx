import { createContext, PropsWithChildren, useContext } from 'react';

export type ActivityType = 'exercise' | 'rest-round' | 'rest-exercise' | 'prep';

export interface TimeSlot {
  remainingTimeInSeconds: number;
  startTimeInSeconds: number;
  endTimeInSeconds: number;
  progressPercent: number;
  isActive: boolean;
  containerRound: number;
  containerExercise?: string;
  activityType: ActivityType;
}

export interface TimeContextType {
  currentRound: number;
  remainingRoundTimeInSeconds: number;
  remainingWorkoutTimeInSeconds: number;
  buckets: TimeSlot[];
  currentBucket: TimeSlot;
  setCurrentBucket: (bucket: TimeSlot) => void;
  setCurrentRound: (round: number) => void;
  elapsedTimeInSeconds: number;
  isRunning: boolean;
  pause: () => void;
  reset: () => void;
  toggleIsRunning: () => void;
  skipCurrentActivity: () => void;
  jumpToBucket: (bucket: TimeSlot) => void;
  workoutCompletionTime: number | null;
}

export const TimeContext = createContext<TimeContextType>({
  currentRound: 0,
  isRunning: false,
  remainingRoundTimeInSeconds: 0,
  remainingWorkoutTimeInSeconds: 0,
  buckets: [],
  elapsedTimeInSeconds: 0,
  currentBucket: {
    remainingTimeInSeconds: 0,
    startTimeInSeconds: 0,
    endTimeInSeconds: 0,
    progressPercent: 0,
    isActive: false,
    containerRound: 0,
    activityType: 'exercise',
  },
  setCurrentBucket(): void {
    throw new Error('Function not implemented.');
  },
  setCurrentRound(): void {
    throw new Error('Function not implemented.');
  },
  reset(): void {
    throw new Error('Function not implemented.');
  },
  toggleIsRunning(): void {
    throw new Error('Function not implemented.');
  },
  skipCurrentActivity(): void {
    throw new Error('Function not implemented.');
  },
  jumpToBucket(): void {
    throw new Error('Function not implemented.');
  },
  workoutCompletionTime: null,
  pause(): void {
    throw new Error('Function not implemented.');
  },
});

export const useTimeContext = () => useContext(TimeContext);

interface TimeContextProviderProps extends PropsWithChildren {
  timeContext: TimeContextType;
}

export const TimeProvider = ({
  timeContext,
  children,
}: TimeContextProviderProps) => (
  <TimeContext.Provider value={timeContext}>{children}</TimeContext.Provider>
);
