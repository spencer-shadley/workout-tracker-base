import ExerciseInfo from '@/components/shared/ExerciseInfo';
import {
  List,
  ListItem,
  IconButton,
  Autocomplete,
  TextField,
} from '@mui/material';
import { DragDropContext } from 'react-beautiful-dnd';
import { InfoOutlined } from '@mui/icons-material';
import { makeRandomFakeExercises } from '@/components/shared/MockExerciseInfo';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import ExerciseCard from './ExerciseCard';
dayjs.extend(relativeTime);

// list of past exercises
// top 5 most recent, filtered as you type
// top 5 most used

// option to add

// TODO: create github issues
// TODO: add icons

const numberOfExercisesPerCategory = 5;

// TODO: localstorage or db
const mostRecentExercises: ExerciseInfo[] = makeRandomFakeExercises();

const mostUsedExercises: ExerciseInfo[] = [...mostRecentExercises];

const exercises: Set<ExerciseInfo> = new Set([
  ...mostRecentExercises.slice(0, numberOfExercisesPerCategory),
  ...mostUsedExercises.slice(0, numberOfExercisesPerCategory),
]);

export default function DialogContent() {
  return (
    <List>
      {[...exercises].map((exercise) => (
        <ListItem
          key={exercise.name}
          secondaryAction={
            <IconButton aria-label="comment">
              <InfoOutlined />
            </IconButton>
          }
        >
          <ExerciseCard exercise={exercise} />
        </ListItem>
      ))}
      <ListItem>
        <Autocomplete
          style={{ width: '100dvw' }}
          options={[...exercises].map((exercise) => exercise.name)}
          renderInput={(params) => (
            <TextField {...params} label="Add exercise" />
          )}
        />
      </ListItem>
    </List>
  );
}
