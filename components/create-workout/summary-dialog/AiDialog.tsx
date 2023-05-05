import { Typography } from '@mui/material';
import { useCreateWorkoutContext } from '../context/CreateWorkoutContextProvider';
import { useState, useEffect } from 'react';
import { askQuestion } from '@/api/askQuestion';
import { tryParse } from '@/hooks/useLocalStorage';
import { SummaryDialog } from './SummaryDialog';
import { useSelectedExercises } from '@/hooks/useSessionStorage';

interface AiDialogProps {
  showDialog: boolean;
  setShowDialog: (show: boolean) => void;
}
export function AiDialog({ showDialog, setShowDialog }: AiDialogProps) {
  const { searchInput } = useCreateWorkoutContext();
  const { searchText } = searchInput;

  const [isSearching, setIsSearching] = useState<boolean>(false);

  const [, setSelectedExercises] = useSelectedExercises();

  useEffect(() => {
    if (!showDialog) return;

    setIsSearching(true);
    askQuestion({
      prompt: `Generate a workout alternating between antagonist and protagonist exercises. Focus on ${searchText}. Return the response as an array of exercise names. Only use double quotes, no single quotes.`,
    })
      .then((response) => {
        const parsed = tryParse<string[]>(response, []);
        setSelectedExercises(parsed);
      })
      .finally(() => {
        setIsSearching(false);
      });
  }, [searchText, setSelectedExercises, showDialog]);

  if (isSearching) return <Typography>Searching...</Typography>;

  return (
    <SummaryDialog close={() => setShowDialog(false)} isOpen={showDialog} />
  );
}
