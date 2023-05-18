import { useAddStyle } from '@/hooks/openai/useAddStyle';
import { useOpenAi } from '@/hooks/openai/useOpenAi';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

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

  const { data } = useOpenAi({
    prompt: styledPrompt,
    queryOptionOverrides: {
      enabled: isOpen,
    }
  });

  return (
    <Dialog open={isOpen} onClose={close}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{data}</DialogContent>
      <DialogActions><Button onClick={close}>close</Button></DialogActions>
    </Dialog>
  );
}
