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
  currentExercise: string;
  remainingExerciseTimeInMilliseconds: number;
  remainingWorkoutTimeInMilliseconds: number;
  isRunning: boolean;
  buckets: TimeSlot[];
}

export const TimeContext = createContext<TimeContextType>({
  currentRound: 0,
  isRunning: false,
  remainingRoundTimeInMilliseconds: 0,
  currentExercise: '',
  remainingExerciseTimeInMilliseconds: 0,
  remainingWorkoutTimeInMilliseconds: 0,
  buckets: [],
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
