import ExerciseInfo from '@/components/shared/interfaces/ExerciseInfo';
import { PropsWithChildren, createContext, useContext } from 'react';

export interface TimeSlot {
  remainingTimeInMilliseconds: number;
  startTimeInMilliseconds: number;
  endTimeInMilliseconds: number;
  isActive: boolean;
  containerRound: number;
  isRest: boolean;
  containerExercise?: ExerciseInfo;
}

export interface TimeContextType {
  currentRound: number;
  remainingRoundTimeInMilliseconds: number;
  remainingWorkoutTimeInMilliseconds: number;
  isRunning: boolean;
  buckets: TimeSlot[];
  elapsedTimeInMilliseconds: number;
  currentBucket: TimeSlot;
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
    isRest: false,
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
