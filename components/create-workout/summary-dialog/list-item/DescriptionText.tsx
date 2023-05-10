import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  DialogContentText,
  Skeleton,
} from '@mui/material';
import { logError } from '@/utils/logger';
import { useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useOpenAi } from '@/hooks/openai/useOpenAi';

export function DescriptionText({ exerciseName }: { exerciseName: string }) {
  const [shouldShowDescription, setShouldShowDescription] =
    useState<boolean>(false);

  return (
    <Accordion
      TransitionProps={{ unmountOnExit: true }}
      expanded={shouldShowDescription}
      onChange={() => setShouldShowDescription(!shouldShowDescription)}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <DialogContentText variant="subtitle2">
          Click to {shouldShowDescription ? 'hide' : 'show'} description
        </DialogContentText>
      </AccordionSummary>
      <DescriptionDetails exerciseName={exerciseName} />
    </Accordion>
  );
}

function DescriptionDetails({ exerciseName }: { exerciseName: string }) {
  const {
    isFetching: isLoading,
    error,
    data: description,
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

  return <AccordionDetails>{description}</AccordionDetails>;
}
