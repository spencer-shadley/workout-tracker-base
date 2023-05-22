import { useState } from 'react';

/* eslint-disable indent */
import {
    MuscleGroupsChips
} from '@/components/main/workout/activity/card/muscle-group-chips/MuscleGroupsChips';
/* eslint-enable indent */
import InfoIcon from '@mui/icons-material/Info';
import SchoolIcon from '@mui/icons-material/School';

import { useExerciseContext } from '../../../shared/ExerciseProvider';
import { AddOrRemoveFromCartButtons } from '../../icons/AddOrRemoveFromCartButtons';
import { InfoDialog } from './InfoDialog';
import { ResultIcon } from './ResultIcon';
import { ResultListItemText } from './ResultListItemText';
import { StepsDialog } from './StepsDialog';

export default function Result() {
  const { exerciseName } = useExerciseContext();

  const [shouldShowAbout, setShouldShowAbout] = useState<boolean>(false);
  const [shouldShowSteps, setShouldShowSteps] = useState<boolean>(false);

  return (
    <>
      <div className='flex w-full'>
        <AddOrRemoveFromCartButtons />
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
      <InfoDialog isOpen={shouldShowAbout} close={() => setShouldShowAbout(false)}/>
      <StepsDialog isOpen={shouldShowSteps} close={() => setShouldShowSteps(false)}/>
    </>
  );
}
