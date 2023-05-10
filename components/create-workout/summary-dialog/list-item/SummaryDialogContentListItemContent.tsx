import { IconButton, Tooltip, Typography } from '@mui/material';
import { useCallback } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { useSelectedExercises } from '@/hooks/storage/useSessionStorage';
import { DescriptionText } from './DescriptionText';
import { MuscleGroupChips } from '@/components/main/workout/activity/card/MuscleGroupChips';

interface SummaryDialogContentListItemContentProps {
  exerciseName: string;
}
export function SummaryDialogContentListItemContent({
  exerciseName,
}: SummaryDialogContentListItemContentProps) {
  const [exercises, setExercises] = useSelectedExercises();

  const removeExercise = useCallback(() => {
    const filteredExercises = exercises.filter((name) => name !== exerciseName);
    setExercises(filteredExercises);
  }, [exerciseName, exercises, setExercises]);

  return (
    <article className="w-full">
      <span className="flex items-center mb-5">
        <div className="flex-1 ">
          <Typography variant="overline" fontSize={20}>
            {exerciseName}
          </Typography>
          <MuscleGroupChips exerciseName={exerciseName} />
        </div>
        <Tooltip title={`Remove ${exerciseName}`} arrow>
          <IconButton
            onClick={() => {
              removeExercise();
            }}
          >
            <CloseIcon />
          </IconButton>
        </Tooltip>
      </span>
      <DescriptionText exerciseName={exerciseName} />
    </article>
  );
}
