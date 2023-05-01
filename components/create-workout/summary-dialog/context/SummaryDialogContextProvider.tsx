import { PropsWithChildren, createContext, useContext } from 'react';

export interface SummaryDialogType {
  isOpen: boolean;
  close: () => void;
}

export const SummaryDialogContext = createContext<SummaryDialogType>({
  isOpen: false,
  close: () => {
    console.error('close not set');
  },
});

export const useSummaryDialogContext = () => useContext(SummaryDialogContext);

interface SummaryDialogProviderProps extends PropsWithChildren {
  summaryDialogContext: SummaryDialogType;
}

export const SummaryDialogProvider = ({
  summaryDialogContext,
  children,
}: SummaryDialogProviderProps) => (
  <SummaryDialogContext.Provider value={summaryDialogContext}>
    {children}
  </SummaryDialogContext.Provider>
);