import {
  Grid,
  Paper,
  Typography,
  Divider,
  List,
  Alert,
  Snackbar,
} from '@mui/material';
import { useContext, useRef, useState } from 'react';
import ExerciseListItem from './ExerciseListItem';
import { useDrop } from 'react-dnd';
import DraggableExerciseInfo from '@/components/shared/DraggableExerciseInfo';
import itemTypes from '@/utils/itemType';
import { ExercisesContext } from './ExerciseList';
import { ExerciseColumnTypes } from '@/components/shared/ExerciseColumnTypes';

interface ExerciseColumnProps {
  title: ExerciseColumnTypes;
}

export default function ExerciseColumn({ title }: ExerciseColumnProps) {
  const { exercises, moveExercise } = useContext(ExercisesContext);

  const [showDuplicateExerciseWarning, setShowDuplicateExerciseWarning] =
    useState<boolean>(false);
  const ref = useRef(null);
  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: itemTypes.EXERCISE_CARD,
      drop: (droppedExercise) => {
        if (exercises.get(droppedExercise.name)?.currentColumn === title) {
          setShowDuplicateExerciseWarning(true);
          return;
        }

        moveExercise(
          droppedExercise,
          title === 'Exercises' ? 'Workout' : 'Exercises'
        );
      },
      hover: (item: DraggableExerciseInfo) => {
        console.log(item);
        if (!ref.current) {
          return;
        }
      },
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }),
    [exercises]
  );

  const getExercisesOfColumn = (column: ExerciseColumnTypes) => {
    return [...exercises.values()].filter(
      (exercise) => exercise.currentColumn === column
    );
  };

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
          <List ref={drop}>
            {getExercisesOfColumn(title).map((exercise) => (
              <ExerciseListItem
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
        autoHideDuration={6000}
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
          You already added this exercise
        </Alert>
      </Snackbar>
    </>
  );
}
