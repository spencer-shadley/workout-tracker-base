import {
  Typography,
  LinearProgress,
  List,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  Avatar,
  ListItem,
  ListItemAvatar,
} from '@mui/material';
import AiFormat from '../api/data/AiFormat';
import ExerciseListItemContent from './ExerciseListItemContent';
import AIExercise from '../api/data/AIExercise';

interface AiWorkoutListProps {
  aiPrompt: string;
  rawAiResponse: string;
  retry: () => void;
}

export default function AiWorkoutList({
  rawAiResponse,
  aiPrompt,
  retry,
}: AiWorkoutListProps) {
  if (!rawAiResponse)
    return (
      <div style={{ margin: '5' }}>
        <Typography>Creating a workout just for you...</Typography>
        <LinearProgress />
      </div>
    );
  try {
    const aiResponse = JSON.parse(rawAiResponse.trim()) as AiFormat;
    const { exercises } = aiResponse;
    return (
      <>
        <Typography variant="h2">
          {aiPrompt.slice(0, aiPrompt.indexOf('.'))}
        </Typography>
        <List>
          {exercises.map((exercise, index) => (
            <AiExerciseToListItem
              aiExercise={exercise}
              key={Math.random()}
              stepNumber={index + 1}
            />
          ))}
        </List>
        <Accordion>
          <AccordionSummary>
            <Typography>See full details</Typography>
          </AccordionSummary>
          <AccordionDetails>{JSON.stringify(rawAiResponse)}</AccordionDetails>
        </Accordion>
      </>
    );
  } catch (e) {
    console.error('failed to parse ai response', e);
    return (
      <>
        <Typography>
          Failed to make a workout, please try a different prompt or try again.
        </Typography>
        <Button onClick={() => retry()}>Retry</Button>
      </>
    );
  }
}

interface AiExerciseToListItemProps {
  aiExercise: AIExercise;
  stepNumber: number;
}

function AiExerciseToListItem({
  aiExercise,
  stepNumber,
}: AiExerciseToListItemProps) {
  return aiExercise ? (
    <ListItem key={Math.random()}>
      <ListItemAvatar>
        <Avatar>{stepNumber++}</Avatar>
      </ListItemAvatar>
      <ExerciseListItemContent {...aiExercise} />
    </ListItem>
  ) : null;
}
