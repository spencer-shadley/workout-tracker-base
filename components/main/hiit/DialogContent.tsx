import ExerciseInfo from '@/components/shared/ExerciseInfo';
import {
  List,
  ListItem,
  IconButton,
  Autocomplete,
  TextField,
  Card,
  CardContent,
  Typography,
  TypographyProps,
} from '@mui/material';

import { InfoOutlined } from '@mui/icons-material';
import { makeRandomFakeExercises } from '@/components/shared/MockExerciseInfo';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
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

interface TypographyIfExistsProps extends TypographyProps {
  data: unknown | undefined;
  beforeText: string;
  afterText: string;
}

const ExerciseStatLabel = ({
  data,
  beforeText,
  afterText,
  ...otherProps
}: TypographyIfExistsProps) => {
  return data ? (
    // TODO: bold the data
    <Typography color="text.secondary" {...otherProps}>
      {`${beforeText} ${data} ${afterText}`.trim()}
    </Typography>
  ) : null;
};

interface ExerciseButtonProps {
  exercise: ExerciseInfo;
}

const ExerciseCard = ({ exercise }: ExerciseButtonProps) => {
  return (
    <Card style={{ width: '100dvw' }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {exercise.name}
        </Typography>
        <ExerciseStatLabel
          data={exercise.description}
          beforeText=""
          afterText=""
        />
        <ExerciseStatLabel
          data={
            exercise.lastCompleted
              ? dayjs().to(dayjs(exercise.lastCompleted))
              : undefined
          }
          beforeText="Last completed"
          afterText=""
        />
        <ExerciseStatLabel
          data={exercise.numberOfTimesCompleted}
          beforeText="Completed"
          afterText="times"
        />
        <ExerciseStatLabel
          data={exercise.maxWeight}
          beforeText="Max weight"
          afterText="lbs"
        />
      </CardContent>
    </Card>
  );
};

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
          {/* <ExerciseButton exercise={exercise} /> */}
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
