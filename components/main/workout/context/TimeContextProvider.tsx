import { PropsWithChildren, createContext, useContext } from 'react';

export type ActivityType = 'exercise' | 'rest-round' | 'rest-exercise';

export interface TimeSlot {
  remainingTimeInMilliseconds: number;
  startTimeInMilliseconds: number;
  endTimeInMilliseconds: number;
  isActive: boolean;
  containerRound: number;
  containerExercise?: string;
  exerciseType: ActivityType;
}

export interface TimeContextType {
  currentRound: number | null;
  remainingRoundTimeInMilliseconds: number;
  remainingWorkoutTimeInMilliseconds: number;
  buckets: TimeSlot[];
  currentBucket: TimeSlot;
  setCurrentBucket: (bucket: TimeSlot) => void;
  setCurrentRound: (round: number) => void;
  elapsedTimeInMilliseconds: number;
  isRunning: boolean;
  reset: () => void;
  toggleIsRunning: () => void;
  skipCurrentActivity: () => void;
  jumpToBucket: (bucket: TimeSlot) => void;
  workoutCompletionTime: number | null;
  mostRecentCompletedExerciseTime: number | null;
}

export const TimeContext = createContext<TimeContextType>({
  currentRound: 0,
  isRunning: false,
  remainingRoundTimeInMilliseconds: 0,
  remainingWorkoutTimeInMilliseconds: 0,
  buckets: [],
  elapsedTimeInMilliseconds: 0,
  currentBucket: {
    remainingTimeInMilliseconds: 0,
    startTimeInMilliseconds: 0,
    endTimeInMilliseconds: 0,
    isActive: false,
    containerRound: 0,
    exerciseType: 'exercise',
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
  mostRecentCompletedExerciseTime: null,
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
