import { ListItem, ListItemText } from '@mui/material';
import { useState } from 'react';
import InfoIcon from '@mui/icons-material/Info';
import SchoolIcon from '@mui/icons-material/School';
import { ResultIcon } from './ResultIcon';
import { AddOrRemoveFromCartButtons } from '../icons/AddOrRemoveFromCartButtons';
import { ListItemWithDetails } from './ListItemWithDetails';
import { useAddStyle } from '@/hooks/openai/useAddStyle';

interface ResultProps {
  exerciseName: string;
}
export default function Result({ exerciseName }: ResultProps) {
  const [shouldShow, setShouldShow] = useState<boolean>(false);

  const aboutPrompt = useAddStyle(
    `Tell me about ${exerciseName} in a few sentences`
  );
  const howToPrompt = useAddStyle(
    `Provide an enumerated list of steps for how to do the exercise ${exerciseName}`
  );

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
          prompt={aboutPrompt}
          icon={<InfoIcon />}
          setShouldShow={setShouldShow}
        />
        <ResultIcon
          setShouldShow={setShouldShow}
          icon={<SchoolIcon />}
          tooltip={`Learn how to do ${exerciseName}`}
          prompt={howToPrompt}
        />
      </div>
    </ListItem>
  );
}
