import ExerciseInfo from '@/components/shared/interfaces/ExerciseInfo';
import { PropsWithChildren, createContext, useContext } from 'react';

export type ActivityType = 'exercise' | 'rest-round' | 'rest-exercise';

export interface TimeSlot {
  remainingTimeInMilliseconds: number;
  startTimeInMilliseconds: number;
  endTimeInMilliseconds: number;
  isActive: boolean;
  containerRound: number;
  containerExercise?: ExerciseInfo;
  exerciseType: ActivityType;
}

export interface TimeContextType {
  currentRound: number;
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
  setCurrentBucket: function (): void {
    throw new Error('Function not implemented.');
  },
  setCurrentRound: function (): void {
    throw new Error('Function not implemented.');
  },
  reset: function (): void {
    throw new Error('Function not implemented.');
  },
  toggleIsRunning: function (): void {
    throw new Error('Function not implemented.');
  },
  skipCurrentActivity: function (): void {
    throw new Error('Function not implemented.');
  },
  jumpToBucket: function (): void {
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