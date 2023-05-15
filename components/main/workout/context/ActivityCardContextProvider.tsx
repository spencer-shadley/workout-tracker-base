import { createContext, PropsWithChildren, useContext } from 'react';

import { ActivityType } from './TimeContextProvider';

export interface ActivityCardContextType {
  exerciseName: string | null;
  isDismissible: boolean;
  activityType: ActivityType;
}

export const ActivityCardContext = createContext<ActivityCardContextType>({
  exerciseName: null,
  isDismissible: false,
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
