import { createContext, PropsWithChildren, useContext } from 'react';

import { UsageState } from '@/hooks/storage/useLocalStorage';

export interface TutorialContextType {
    currentStage: UsageState,
    setStage: (stage: UsageState) => void,
}

export const TutorialContext = createContext<TutorialContextType>({
  currentStage: `initial`,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setStage: () => {},
});

export const useTutorialContext = () => useContext(TutorialContext);

interface TutorialContextProviderProps extends PropsWithChildren {
    tutorialContext: TutorialContextType;
}

export const TutorialProvider = ({
  tutorialContext,
  children,
}: TutorialContextProviderProps) =>
  <TutorialContext.Provider value={tutorialContext}>
    {children}
  </TutorialContext.Provider>
;
