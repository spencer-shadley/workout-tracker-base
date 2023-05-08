import { ListItemText } from '@mui/material';
import { useAiStyle } from '@/hooks/useLocalStorage';
import { useOpenAi } from '@/hooks/openai/useOpenAi';

interface ListItemWithDetailsProps {
  exerciseName: string;
}
export function ListItemWithDetails({
  exerciseName,
}: ListItemWithDetailsProps) {
  const [aiStyle] = useAiStyle();

  const prompt = `Tell me about ${exerciseName} in a few sentences. Answer in the style of ${aiStyle}`;

  const { data: exerciseDetailsText } = useOpenAi({
    prompt,
  });

  return (
    <ListItemText
      className="flex-grow w-full"
      primary={exerciseName}
      secondary={exerciseDetailsText ?? 'Loading...'}
    />
  );
}
