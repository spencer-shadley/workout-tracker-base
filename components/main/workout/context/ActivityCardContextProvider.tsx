import { createContext, PropsWithChildren, useContext } from 'react';

export interface ActivityCardContextType {
  isDismissible: boolean;
}

export const ActivityCardContext = createContext<ActivityCardContextType>({
  isDismissible: false,
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
