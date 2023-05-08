import { ListItemText, Skeleton } from '@mui/material';
import { useAiStyle } from '@/hooks/useLocalStorage';
import { useOpenAi } from '@/hooks/openai/useOpenAi';
import { useCreateWorkoutContext } from '../context/CreateWorkoutContextProvider';

interface ListItemWithDetailsProps {
  exerciseName: string;
}
export function ListItemWithDetails({
  exerciseName,
}: ListItemWithDetailsProps) {
  const { searchInput } = useCreateWorkoutContext();
  const { isSearching } = searchInput;
  const [aiStyle] = useAiStyle();

  const prompt = `Tell me about ${exerciseName} in a few sentences. Answer in the style of ${aiStyle}`;

  const { data: exerciseDetailsText } = useOpenAi({
    prompt,
  });

  return (
    <ListItemText
      className="flex-grow w-full"
      primary={isSearching ? '' : exerciseName}
      secondary={exerciseDetailsText ?? <Skeleton sx={{ fontSize: '3rem' }} />}
    />
  );
}
