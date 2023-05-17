
import { useAddStyle } from '@/hooks/openai/useAddStyle';
import { useOpenAi } from '@/hooks/openai/useOpenAi';
/* eslint-disable indent */
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

interface GenericDialogProps {
  isOpen: boolean;
  close: () => void;
}

export function InfoDialog(props: GenericDialogProps) {
  const { exerciseName } = useResultContext();
  return <PromptDialog {...props} prompt={`Tell me about ${exerciseName} in a few sentences.`} title={`About ${exerciseName}`}/>;
}

export function StepsDialog(props: GenericDialogProps) {
  const { exerciseName } = useResultContext();
  return <PromptDialog {...props} prompt={`Provide an enumerated list of steps for how to do the exercise ${exerciseName}`} title={`How to do ${exerciseName}`}/>;
}

interface PromptDialogProps extends GenericDialogProps {
  prompt: string;
  title: string;
}

export function PromptDialog({isOpen, close, prompt, title}: PromptDialogProps) {
  const styledPrompt = useAddStyle(
   prompt
  );

  const { data } = useOpenAi({
    prompt: styledPrompt,
  });
  
  return (
    <Dialog open={isOpen} onClose={close}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{data}</DialogContent>
      <DialogActions><Button onClick={close}>close</Button></DialogActions>
    </Dialog>
  )
}