import { PropsWithChildren, createContext, useContext } from 'react';

export interface TimeContextType {
  currentRound: number;
  timeElapsedInMilliseconds: number;
}

export const TimeContext = createContext<TimeContextType>({
  currentRound: 0,
  timeElapsedInMilliseconds: 0,
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
