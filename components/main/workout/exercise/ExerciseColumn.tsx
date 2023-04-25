import {
  Grid,
  Paper,
  Typography,
  Divider,
  List,
  Alert,
  Snackbar,
  TextField,
  Autocomplete,
} from '@mui/material';
import { useState } from 'react';
import ExerciseListItem from './ExerciseListItem';
import { useDrop } from 'react-dnd';
import itemTypes from '@/utils/itemType';
import { ExerciseColumnTypes } from '@/components/shared/interfaces/ExerciseColumnTypes';
import ExerciseInfo from '@/components/shared/interfaces/ExerciseInfo';

interface ExerciseColumnProps {
  title: ExerciseColumnTypes;
}

// TODO: delete and replace with Exercises
export default function ExerciseColumn({ title }: ExerciseColumnProps) {
  const [filter, setFilter] = useState<string>('');

  const [columnExercises, setColumnExercises] = useState<ExerciseInfo[]>(
    exercises.values()
  );

  const [showDuplicateExerciseWarning, setShowDuplicateExerciseWarning] =
    useState<boolean>(false);
  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: itemTypes.EXERCISE_CARD,
      drop: (droppedExercise: ExerciseInfo) => {
        if (columnExercises.includes(droppedExercise)) {
          setShowDuplicateExerciseWarning(true);
          return;
        }
        setColumnExercises([...columnExercises, droppedExercise]);
      },
      hover: (draggedExercise: ExerciseInfo) => {},
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }),
    [columnExercises]
  );

  return (
    <>
      <Grid item xs={5} ref={drop}>
        <Paper
          elevation={6}
          sx={{ height: '100%', background: isOver ? 'cyan' : 'darkcyan' }}
        >
          <Typography variant="h3" textTransform="uppercase" textAlign="center">
            {title}
          </Typography>
          <Divider />
          <Autocomplete
            fullWidth
            freeSolo
            renderInput={(params) => (
              <TextField
                {...params}
                margin="normal"
                label="Search exercise"
                type="search"
                value={filter}
                onChange={(event) => setFilter(event.target.value)}
              />
            )}
            options={columnExercises.map((exercise) => exercise.name)}
          />
          <List ref={drop} sx={{ overflow: 'auto', maxHeight: '500px' }}>
            {columnExercises
              .filter((exercise) => exercise.name.includes(filter))
              .map((exercise) => (
                <ExerciseListItem
                  shouldShowCloseButton={title === 'Workout'}
                  key={exercise.name}
                  exercise={exercise}
                  isOver={isOver}
                />
              ))}
            {/* <ListItem>
            <Autocomplete
              style={{ width: '100dvw' }}
              options={exercises.map((exercise) => exercise.name)}
              renderInput={(params) => (
                <TextField {...params} label="Search exercise" />
              )}
            />
          </ListItem> */}
          </List>
        </Paper>
      </Grid>
      <Snackbar
        open={showDuplicateExerciseWarning}
        autoHideDuration={1000}
        onClose={() => {
          setShowDuplicateExerciseWarning(false);
        }}
      >
        <Alert
          onClose={() => {
            setShowDuplicateExerciseWarning(false);
          }}
          severity="warning"
          sx={{ width: '100%' }}
        >
          Exercise already exists
        </Alert>
      </Snackbar>
    </>
  );
}
