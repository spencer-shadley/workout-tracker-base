import { useCreateWorkoutContext } from '../context/CreateWorkoutContextProvider';
import { tryParse } from '@/hooks/useLocalStorage';
import { SummaryDialog } from './SummaryDialog';
import { useSelectedExercises } from '@/hooks/useSessionStorage';
import { useOpenAi } from '@/hooks/openai/useOpenAi';
import { useEffect } from 'react';

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

  return showDialog ? (
    <SummaryDialog
      close={() => setShowDialog(false)}
      isOpen={showDialog}
      isLoading={isFetching}
    />
  ) : null;
}
