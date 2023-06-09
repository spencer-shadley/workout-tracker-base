import { useOpenAi } from '@/api/hooks/openai/useOpenAi';
import { useExerciseContext } from '@/components/shared/ExerciseProvider';
import { logError } from '@/utils/logger';
import { AccordionDetails, DialogContentText, Skeleton } from '@mui/material';

export function DescriptionDetails() {
  const { exerciseName } = useExerciseContext();
  const {
    isFetching: isLoading, error, data: description,
  } = useOpenAi<string>({
    prompt: `Give me a brief description for the exercise ${exerciseName}`,
  });

  if (isLoading) {
    return <Skeleton />;
  }

  if (error) {
    logError(error);
    return <DialogContentText>
      Error fetching description
    </DialogContentText>;
  }

  return <AccordionDetails sx={{ padding: 0 }}>
    {description}
  </AccordionDetails>;
}
