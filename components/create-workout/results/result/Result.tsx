/* eslint-disable indent */
import { useState } from 'react';

import {
    MuscleGroupsChips
} from '@/components/main/workout/activity/card/muscle-group-chips/MuscleGroupsChips';
import InfoIcon from '@mui/icons-material/Info';
import SchoolIcon from '@mui/icons-material/School';
import { ListItem } from '@mui/material';

import { AddOrRemoveFromCartButtons } from '../../icons/AddOrRemoveFromCartButtons';
import { ResultProvider } from './context/ResultProvider';
import { ResultIcon } from './ResultIcon';
import { InfoDialog, ResultListItemText, StepsDialog } from './ResultListItemText';

interface ResultProps {
  exerciseName: string;
}

export default function Result({ exerciseName }: ResultProps) {
  const [shouldShowAbout, setShouldShowAbout] = useState<boolean>(false);
  const [shouldShowSteps, setShouldShowSteps] = useState<boolean>(false);

  return (
    <ResultProvider exerciseName={exerciseName} >
      <ListItem className="hover:bg-slate-200 flex flex-col items-start">
        <div className='flex w-full'>
          <div className='align-middle'>
            <AddOrRemoveFromCartButtons />
          </div>
          <div className='grow'>
          <ResultListItemText />
          </div>
          <div className='flex'>
          <ResultIcon
            tooltip={`Learn more about ${exerciseName}`}
            icon={<InfoIcon />}
            onClick={() => setShouldShowAbout(true)}
          />
          <ResultIcon
            onClick={() => setShouldShowAbout(true)}
            icon={<SchoolIcon />}
            tooltip={`Learn how to do ${exerciseName}`}
          />
          </div>
        </div>
        <MuscleGroupsChips exerciseName={exerciseName} />
      </ListItem>
      <InfoDialog isOpen={shouldShowAbout} close={() => setShouldShowAbout(false)}/>
      <StepsDialog isOpen={shouldShowSteps} close={() => setShouldShowSteps(false)}/>
    </ResultProvider>
  );
}
