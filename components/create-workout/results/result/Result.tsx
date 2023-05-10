import { ListItem } from '@mui/material';
import { useState } from 'react';
import InfoIcon from '@mui/icons-material/Info';
import SchoolIcon from '@mui/icons-material/School';
import { ResultIcon } from './ResultIcon';
import { AddOrRemoveFromCartButtons } from '../../icons/AddOrRemoveFromCartButtons';
import { ListItemWithDetails } from '../ListItemWithDetails';
import { useAddStyle } from '@/hooks/openai/useAddStyle';
import { ResultListItemText } from './ResultListItemText';

interface ResultProps {
  exerciseName: string;
}

export default function Result({ exerciseName }: ResultProps) {
  const [shouldShowDetails, setShouldShowDetails] = useState<boolean>(false);

  const aboutPrompt = useAddStyle(
    `Tell me about ${exerciseName} in a few sentences`
  );
  const howToPrompt = useAddStyle(
    `Provide an enumerated list of steps for how to do the exercise ${exerciseName}`
  );

  return (
    <ListItem className="w-full hover:bg-slate-200 content-between">
      <AddOrRemoveFromCartButtons exerciseName={exerciseName} />
      {shouldShowDetails ? (
        <ListItemWithDetails exerciseName={exerciseName} />
      ) : (
        <ResultListItemText exerciseName={exerciseName} />
      )}
      <div className="flex flex-col space-y-2">
        <ResultIcon
          tooltip={`Learn more about ${exerciseName}`}
          prompt={aboutPrompt}
          icon={<InfoIcon />}
          setShouldShow={setShouldShowDetails}
        />
        <ResultIcon
          setShouldShow={setShouldShowDetails}
          icon={<SchoolIcon />}
          tooltip={`Learn how to do ${exerciseName}`}
          prompt={howToPrompt}
        />
      </div>
    </ListItem>
  );
}
