import { useOpenAi } from '@/api/hooks/openai/useOpenAi';
import { useAddStyle } from '@/hooks/openai/useAddStyle';
/* eslint-disable indent */
import {
    Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography
} from '@mui/material';

/* eslint-enable indent */
import { TextSkeletons } from './TextSkeletonsProps';

export interface GenericDialogProps {
  isOpen: boolean;
  close: () => void;
}

interface PromptDialogProps extends GenericDialogProps {
  prompt: string;
  title: string;
}

export function PromptDialog({ isOpen, close, prompt, title }: PromptDialogProps) {
  const styledPrompt = useAddStyle(
    prompt
  );

  const { data, isFetching: isLoading } = useOpenAi<string>({
    prompt: styledPrompt,
    queryOptionOverrides: {
      enabled: isOpen,
    }
  });

  return (
    <Dialog open={isOpen} onClose={close}>
      <DialogTitle>
        {title}
      </DialogTitle>
      <DialogContent>
        {isLoading ? <TextSkeletons numberOfLinesOfText={5}/> : <Typography>
          {data}
        </Typography>}
      </DialogContent>
      <DialogActions>
        <Button onClick={close}>
          close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
