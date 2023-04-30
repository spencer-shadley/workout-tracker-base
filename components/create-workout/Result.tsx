import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from '@mui/material';
import { useState } from 'react';
import { useCreateWorkoutContext as useCreateWorkoutContext } from './context/CreateWorkoutContextProvider';
import InfoIcon from '@mui/icons-material/Info';
import SchoolIcon from '@mui/icons-material/School';
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';
import { ResultIcon } from './ResultIcon';

interface ResultProps {
  exerciseName: string;
}
export default function Result({ exerciseName }: ResultProps) {
  const { exercisesCart } = useCreateWorkoutContext();
  const { addExerciseNameToCart, addedExerciseNames } = exercisesCart;
  const [exerciseDetailsText, setExerciseDetailsText] = useState<string>('');
  const isExerciseAdded = addedExerciseNames.includes(exerciseName);

  return (
    <ListItem className="w-full hover:bg-slate-200 ">
      <ResultIcon
        tooltip={`Learn more about ${exerciseName}`}
        prompt={`Tell me about ${exerciseName} in a few sentences`}
        setDescriptionText={setExerciseDetailsText}
        icon={<InfoIcon />}
      />
      <ListItemText
        className="flex-grow w-full"
        primary={exerciseName}
        secondary={exerciseDetailsText === '' ? undefined : exerciseDetailsText}
      />
      <ResultIcon
        icon={<SchoolIcon />}
        tooltip={`Learn how to do ${exerciseName}`}
        prompt={`Tell me how to do the exercise ${exerciseName}`}
        setDescriptionText={setExerciseDetailsText}
      />
      <Tooltip
        title={`Add ${
          isExerciseAdded ? 'another' : ''
        } ${exerciseName} to workout`}
      >
        <ListItemButton
          onClick={() => {
            addExerciseNameToCart(exerciseName);
          }}
        >
          <ListItemIcon>
            {isExerciseAdded ? <CheckIcon /> : <AddIcon />}
          </ListItemIcon>
        </ListItemButton>
      </Tooltip>
    </ListItem>
  );
}
