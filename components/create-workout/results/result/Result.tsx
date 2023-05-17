/* eslint-disable indent */
import { useState } from 'react';

import {
    MuscleGroupsChips
} from '@/components/main/workout/activity/card/muscle-group-chips/MuscleGroupsChips';
import { useAddStyle } from '@/hooks/openai/useAddStyle';
import InfoIcon from '@mui/icons-material/Info';
import SchoolIcon from '@mui/icons-material/School';
import { ListItem } from '@mui/material';

import { AddOrRemoveFromCartButtons } from '../../icons/AddOrRemoveFromCartButtons';
import { ResultIcon } from './ResultIcon';
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
    <ListItem className="hover:bg-slate-200 flex flex-col items-start">
      <div className='flex w-full'>
        <div className='align-middle'>
          <AddOrRemoveFromCartButtons exerciseName={exerciseName} />
        </div>
        <div className='grow'>
        <ResultListItemText exerciseName={exerciseName} shouldShowDetails={shouldShowDetails} />
        </div>
        <div className='flex'>
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
      </div>
      <MuscleGroupsChips exerciseName={exerciseName} />
    </ListItem>
  );
}
