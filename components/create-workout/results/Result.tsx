import { ListItem, ListItemText } from '@mui/material';
import { useEffect, useState } from 'react';
import InfoIcon from '@mui/icons-material/Info';
import SchoolIcon from '@mui/icons-material/School';
import { ResultIcon } from './ResultIcon';
import { AddToExerciseBasketIconButton } from '../AddToExerciseBasketIconButton';
import { useAiStyle } from '@/hooks/useLocalStorage';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useManualAskQuestion, useOpenAi } from '@/hooks/openai/useOpenAi';
import { askQuestion } from '@/api/askQuestion';

interface ResultProps {
  exerciseName: string;
}
export default function Result({ exerciseName }: ResultProps) {
  const [aiStyle] = useAiStyle();
  const [shouldShow, setShouldShow] = useState<boolean>(false);

  return (
    <ListItem className="w-full hover:bg-slate-200 content-between">
      <AddToExerciseBasketIconButton exerciseName={exerciseName} />
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

// TODO: why is this failing??
function ListItemWithDetails({ exerciseName }: ListItemWithDetailsProps) {
  const [aiStyle] = useAiStyle();
  const [exerciseDetailsText, setExerciseDetailsText] = useState<string>('');

  const prompt = `Tell me about ${exerciseName} in a few sentences. Answer in the style of ${aiStyle}`;

  // working - manual call
  useEffect(() => {
    askQuestion({ prompt }).then((data) => {
      setExerciseDetailsText(data);
    });
  }, [prompt]);

  // throws infinite re-render error - useSWR
  // const { data } = useManualAskQuestion(prompt);
  // useEffect(() => {
  //   setExerciseDetailsText(data ?? '');
  // }, [data]);

  // throws weird rendering error - tanstack query
  // const { data } = useOpenAi({
  //   initialProps: {
  //     prompt,
  //   },
  // });

  // useEffect(() => {
  //   setExerciseDetailsText(data ?? '');
  // }, [data]);

  return (
    <ListItemText
      className="flex-grow w-full"
      primary={exerciseName}
      secondary={exerciseDetailsText ?? 'Loading...'}
    />
  );
}
