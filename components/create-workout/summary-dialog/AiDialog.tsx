import { useEffect } from 'react';

import { useOpenAi } from '@/hooks/openai/useOpenAi';
import { tryParse } from '@/hooks/storage/useLocalStorage';
import { useSelectedExercises } from '@/hooks/storage/useSessionStorage';

import { useCreateWorkoutContext } from '../context/CreateWorkoutContextProvider';
import { SummaryDialogWrapper } from './SummaryDialogWrapper';

interface AiDialogProps {
  showDialog: boolean;
  setShowDialog: (show: boolean) => void;
}
export function AiDialog({ showDialog, setShowDialog }: AiDialogProps) {
  const { searchInput } = useCreateWorkoutContext();
  const { searchText } = searchInput;

  const [, setSelectedExercises] = useSelectedExercises();

  const {
    data: rawWorkoutString,
    isFetching,
    refetch,
  } = useOpenAi({
    prompt: `Generate a workout alternating between antagonist and protagonist exercises. Focus on ${searchText}. Return the response as an array of exercise names. Only use double quotes, no single quotes.`,
    queryOptionOverrides: {
      enabled: false,
    },
  });

  useEffect(() => {
    if (showDialog) refetch();
  }, [refetch, showDialog]);

  useEffect(() => {
    if (rawWorkoutString) {
      const parsed = tryParse<string[]>(rawWorkoutString, []);
      setSelectedExercises(parsed);
    }
  }, [rawWorkoutString, setSelectedExercises]);

  return showDialog ?
    <SummaryDialogWrapper
      close={() => setShowDialog(false)}
      isOpen={showDialog}
      isLoading={isFetching}
    />
    : null;
}
