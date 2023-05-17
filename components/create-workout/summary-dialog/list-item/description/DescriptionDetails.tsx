import { useExerciseContext } from '@/components/shared/ExerciseProvider';
import { useOpenAi } from '@/hooks/openai/useOpenAi';
import { logError } from '@/utils/logger';
import { AccordionDetails, DialogContentText, Skeleton } from '@mui/material';

export function DescriptionDetails() {
  const { exerciseName } = useExerciseContext();
  const {
    isFetching: isLoading, error, data: description,
  } = useOpenAi({
    prompt: `Give me a brief description for the exercise ${exerciseName}`,
  });

  if (isLoading) {
    return <Skeleton />;
  }

  if (error) {
    logError(error);
    return <DialogContentText>Error fetching description</DialogContentText>;
  }

  return <AccordionDetails sx={{ padding: 0 }}>{description}</AccordionDetails>;
}
