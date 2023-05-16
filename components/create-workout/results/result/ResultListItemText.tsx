/* eslint-disable indent */
import {
    MuscleGroupsChips
} from '@/components/main/workout/activity/card/muscle-group-chips/MuscleGroupsChips';
import { useOpenAi } from '@/hooks/openai/useOpenAi';
import { useAiStyle } from '@/hooks/storage/useLocalStorage';
import { ListItemText, Skeleton, Typography } from '@mui/material';

import { TextSkeleton } from '../../../shared/TextSkeleton';
import { useCreateWorkoutContext } from '../../context/CreateWorkoutContextProvider';

interface ResultListItemTextProps {
  exerciseName: string;
  shouldShowDetails: boolean;
}

export function ResultListItemText({ exerciseName, shouldShowDetails }: ResultListItemTextProps) {
  const { searchInput } = useCreateWorkoutContext();
  const { isSearching } = searchInput;

  const [aiStyle] = useAiStyle();

  const prompt = `Tell me about ${exerciseName} in a few sentences. Answer in the style of ${aiStyle}`;

  const { data: exerciseDetailsText } = useOpenAi({
    prompt,
    queryOptionOverrides: {
      enabled: shouldShowDetails
    }
  });

  return (
    <div className="flex-grow w-full">
      {isSearching ? (
        <TextSkeleton />
      ) : (
        <ListItemText
          className="flex-grow w-full"
          primary={<Typography variant='overline'>{isSearching ? '' : exerciseName}</Typography>}
          secondary={shouldShowDetails ? exerciseDetailsText ?? <Skeleton sx={{ fontSize: '3rem' }} /> : undefined}
        />
      )}
      <MuscleGroupsChips exerciseName={exerciseName} />
    </div>
  );
}
