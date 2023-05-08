import { ListItem, ListItemText } from '@mui/material';
import { useState } from 'react';
import InfoIcon from '@mui/icons-material/Info';
import SchoolIcon from '@mui/icons-material/School';
import { ResultIcon } from './ResultIcon';
import { AddOrRemoveFromCartButtons } from '../icons/AddOrRemoveFromCartButtons';
import { useAiStyle } from '@/hooks/useLocalStorage';
import { useOpenAi } from '@/hooks/openai/useOpenAi';

interface ResultProps {
  exerciseName: string;
}
export default function Result({ exerciseName }: ResultProps) {
  const [aiStyle] = useAiStyle();
  const [shouldShow, setShouldShow] = useState<boolean>(false);

  return (
    <ListItem className="w-full hover:bg-slate-200 content-between">
      <AddOrRemoveFromCartButtons exerciseName={exerciseName} />
      {shouldShow ? (
        <ListItemWithDetails exerciseName={exerciseName} />
      ) : (
        <ListItemText className="flex-grow w-full" primary={exerciseName} />
      )}
      <div className="flex flex-col space-y-2">
        <ResultIcon
          tooltip={`Learn more about ${exerciseName}`}
          prompt={`Tell me about ${exerciseName} in a few sentences. Answer in the style of ${aiStyle}`}
          icon={<InfoIcon />}
          setShouldShow={setShouldShow}
        />
        <ResultIcon
          setShouldShow={setShouldShow}
          icon={<SchoolIcon />}
          tooltip={`Learn how to do ${exerciseName}`}
          prompt={`Tell me how to do the exercise ${exerciseName}`}
        />
      </div>
    </ListItem>
  );
}

interface ListItemWithDetailsProps {
  exerciseName: string;
}

function ListItemWithDetails({ exerciseName }: ListItemWithDetailsProps) {
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
