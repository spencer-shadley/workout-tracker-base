import { useState } from 'react';

/* eslint-disable indent */
import {
    MuscleGroupsChips
} from '@/components/main/workout/activity/card/muscle-group-chips/MuscleGroupsChips';
/* eslint-enable indent */
import InfoIcon from '@mui/icons-material/Info';
import SchoolIcon from '@mui/icons-material/School';
import { ListItem, useTheme } from '@mui/material';

import { useExerciseContext } from '../../../shared/ExerciseProvider';
import { AddOrRemoveFromCartButtons } from '../../icons/AddOrRemoveFromCartButtons';
import { InfoDialog } from './InfoDialog';
import { ResultIcon } from './ResultIcon';
import { ResultListItemText } from './ResultListItemText';
import { StepsDialog } from './StepsDialog';

export default function Result() {
  const theme = useTheme();
  const { exerciseName } = useExerciseContext();

  const [shouldShowAbout, setShouldShowAbout] = useState<boolean>(false);
  const [shouldShowSteps, setShouldShowSteps] = useState<boolean>(false);

  return (
    <>
      <ListItem className="hover:bg-slate-200 flex flex-col items-start" sx={{
        backgroundColor: theme.palette.background.default,
      }}>
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
              icon={<InfoIcon color='secondary' />}
              onClick={() => setShouldShowAbout(true)}
            />
            <ResultIcon
              onClick={() => setShouldShowSteps(true)}
              icon={<SchoolIcon color='secondary' />}
              tooltip={`Learn how to do ${exerciseName}`}
            />
          </div>
        </div>
        <MuscleGroupsChips />
      </ListItem>
      <InfoDialog isOpen={shouldShowAbout} close={() => setShouldShowAbout(false)}/>
      <StepsDialog isOpen={shouldShowSteps} close={() => setShouldShowSteps(false)}/>
    </>
  );
}
