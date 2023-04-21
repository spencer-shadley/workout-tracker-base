import ExerciseInfo from '@/components/shared/ExerciseInfo';
import {
  List,
  ListItem,
  Autocomplete,
  TextField,
  Grid,
  Typography,
  Divider,
  Paper,
} from '@mui/material';
import { makeRandomFakeExercises } from '@/components/shared/MockExerciseInfo';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import React, { PropsWithChildren, useRef, useState } from 'react';
import ExerciseListItem from '../exercise/ExerciseListItem';
import { useDrop } from 'react-dnd';
import DraggableExerciseInfo from '@/components/shared/DraggableExerciseInfo';
dayjs.extend(relativeTime);

// list of past exercises
// top 5 most recent, filtered as you type
// top 5 most used

// option to add

// TODO: create github issues
// TODO: add icons

const numberOfTopExercises = 5;

// TODO: localstorage or db
const mostRecentExercises: ExerciseInfo[] = makeRandomFakeExercises();
const mostUsedExercises: ExerciseInfo[] = [...mostRecentExercises];
const allExercises = [...mostRecentExercises, ...mostUsedExercises];
const uniqueExercises: Set<ExerciseInfo> = new Set([...allExercises]);
const topExercises = [...uniqueExercises].slice(0, numberOfTopExercises);

interface ExerciseColumnProps extends PropsWithChildren {
  title: string;
}

function ExerciseColumn({ title, children }: ExerciseColumnProps) {
  return (
    <Grid item xs={5}>
      <Paper elevation={6} sx={{ height: '100%' }}>
        <Typography>{title}</Typography>
        <Divider />
        {children}
      </Paper>
    </Grid>
  );
}

export default function DialogContent() {
  const [exercises] = useState<ExerciseInfo[]>(topExercises);
  const ref = useRef(null);

  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: 'exercise',
      drop: () => console.log('dropped'),
      hover: (item: DraggableExerciseInfo) => {
        console.log(item);
        if (!ref.current) {
          return;
        }
        // const dragIndex = item.index;
        // current element where the dragged element is hovered on
        // const hoverIndex = index;
        // // If the dragged element is hovered in the same place, then do nothing
        // if (dragIndex === hoverIndex) {
        //   return;
        // }
        // // If it is dragged around other elements, then move the image and set the state with position changes
        // // moveImage(dragIndex, hoverIndex);
        // /*
        //     Update the index for dragged item directly to avoid flickering
        //     when the image was half dragged into the next
        //   */
        // item.index = hoverIndex;
      },
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }),
    [exercises]
  );

  return (
    <Grid container justifyContent="space-evenly">
      <ExerciseColumn title="Exercises">
        <List ref={drop}>
          {[...exercises].map((exercise, index) => (
            <ExerciseListItem
              key={exercise.name}
              exercise={exercise}
              isOver={isOver}
              index={index}
            />
          ))}
          <ListItem>
            <Autocomplete
              style={{ width: '100dvw' }}
              options={[...uniqueExercises].map((exercise) => exercise.name)}
              renderInput={(params) => (
                <TextField {...params} label="Add exercise" />
              )}
            />
          </ListItem>
        </List>
      </ExerciseColumn>
      <ExerciseColumn title="Workouts">
        <ExerciseListItem
          key={exercises[0].name}
          exercise={exercises[0]}
          isOver={isOver}
          index={0}
        />
      </ExerciseColumn>
    </Grid>
  );
}
