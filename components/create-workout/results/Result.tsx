import { ListItem, ListItemText } from '@mui/material';
import { useState } from 'react';
import InfoIcon from '@mui/icons-material/Info';
import SchoolIcon from '@mui/icons-material/School';
import { ResultIcon } from './ResultIcon';
import { AddToExerciseBasketIconButton } from '../AddToExerciseBasketIconButton';
import { useAiStyle } from '@/hooks/useLocalStorage';

interface ResultProps {
  exerciseName: string;
}
export default function Result({ exerciseName }: ResultProps) {
  const [aiStyle] = useAiStyle();

  const [exerciseDetailsText, setExerciseDetailsText] = useState<string>('');

  return (
    <ListItem className="w-full hover:bg-slate-200 content-between">
      <AddToExerciseBasketIconButton exerciseName={exerciseName} />
      <ListItemText
        className="flex-grow w-full"
        primary={exerciseName}
        secondary={exerciseDetailsText === '' ? undefined : exerciseDetailsText}
      />
      <div className="flex flex-col space-y-2">
        <ResultIcon
          tooltip={`Learn more about ${exerciseName}`}
          prompt={`Tell me about ${exerciseName} in a few sentences. Answer in the style of ${aiStyle}`}
          setDescriptionText={setExerciseDetailsText}
          icon={<InfoIcon />}
        />
        <ResultIcon
          icon={<SchoolIcon />}
          tooltip={`Learn how to do ${exerciseName}`}
          prompt={`Tell me how to do the exercise ${exerciseName}`}
          setDescriptionText={setExerciseDetailsText}
        />
      </div>
    </ListItem>
  );
}
