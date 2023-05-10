import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  DialogTitle,
  Skeleton,
  Typography,
} from '@mui/material';
import { useOpenAi } from '@/hooks/openai/useOpenAi';
import { useState } from 'react';

interface MuscleGroupDialogProps {
  muscleGroup: string;
  dialogProps: DialogProps;
}
export function MuscleGroupDialog({
  muscleGroup,
  dialogProps,
}: MuscleGroupDialogProps) {
  const [prompt, setPrompt] = useState<string>(
    `Tell me about the muscle group ${muscleGroup}.`
  );
  const { data: aboutExercise, isFetching: isLoading } = useOpenAi({
    prompt,
  });

  return (
    <Dialog {...dialogProps}>
      <DialogTitle>About {muscleGroup}</DialogTitle>
      <DialogContent>
        {isLoading ? (
          <Skeleton sx={{ fontSize: 40, width: '100%' }} />
        ) : (
          <Typography>{aboutExercise}</Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() =>
            setPrompt(
              `Tell me why the muscle group ${muscleGroup} is important`
            )
          }
        >
          Why is this important?
        </Button>
        <Button
          onClick={() =>
            setPrompt(
              `Give me some common exercises with short descriptions that are relevant to the muscle group ${muscleGroup}`
            )
          }
        >
          Tell me relevant exercises
        </Button>
        <Button
          onClick={() =>
            setPrompt(
              `Tell me a random fun fact about the muscle group ${muscleGroup}`
            )
          }
        >
          Random fact
        </Button>
      </DialogActions>
    </Dialog>
  );
}
