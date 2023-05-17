
/* eslint-disable indent */
import { useOpenAi } from '@/hooks/openai/useOpenAi';
import { useAiStyle } from '@/hooks/storage/useLocalStorage';
import {
    Button, Dialog, DialogActions, DialogContent, DialogTitle, ListItemText, Typography
} from '@mui/material';

import { TextSkeleton } from '../../../shared/TextSkeleton';
import { useCreateWorkoutContext } from '../../context/CreateWorkoutContextProvider';
import { useResultContext } from './context/ResultProvider';

export function ResultListItemText() {
  const { exerciseName } = useResultContext();
  const { searchInput } = useCreateWorkoutContext();
  const { isSearching } = searchInput;

  return (
      isSearching ? (
        <TextSkeleton />
      ) : (
        <ListItemText
        sx={{
        }}
          className="flex-grow w-full"
          primary={<Typography variant='overline'>{isSearching ? '' : exerciseName}</Typography>}
        />
      )
  );
}

interface InfoDialogProps {
  isOpen: boolean;
  close: () => void;
}

export function InfoDialog({isOpen, close}: InfoDialogProps) {
  const { exerciseName } = useResultContext();

  const [aiStyle] = useAiStyle();

  const prompt = `Tell me about ${exerciseName} in a few sentences. Answer in the style of ${aiStyle}`;

  const { data: exerciseDetailsText } = useOpenAi({
    prompt,
  });

  return (
    <Dialog open={isOpen} onClose={close}>
      <DialogTitle>About {exerciseName}</DialogTitle>
      <DialogContent>{exerciseDetailsText}</DialogContent>
      <DialogActions><Button>hi</Button></DialogActions>
    </Dialog>
  )
}