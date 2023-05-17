import { createContext, PropsWithChildren, useContext } from 'react';

export interface ResultContextType {
    exerciseName: string;
}

export const ResultContext = createContext<ResultContextType>({
  exerciseName: '',
});

export const useResultContext = () => useContext(ResultContext);

export const ResultProvider = ({ children, ...props }: PropsWithChildren<ResultContextType>) => {
  return (
    <ResultContext.Provider value={{...props}}>
      {children}
    </ResultContext.Provider>
  );
};