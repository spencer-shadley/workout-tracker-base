import ExerciseInfo from '@/components/shared/ExerciseInfo';
import { List, ListItem, Autocomplete, TextField } from '@mui/material';
import { makeRandomFakeExercises } from '@/components/shared/MockExerciseInfo';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import React, { useState } from 'react';
import ExerciseListItem from '../exercise/ExerciseListItem';
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

const uniqueExercises: Set<ExerciseInfo> = new Set([
  ...mostRecentExercises.slice(0, numberOfExercisesPerCategory),
  ...mostUsedExercises.slice(0, numberOfExercisesPerCategory),
]);

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

export default function DialogContent() {
  const [exercises, setExercises] = useState<ExerciseInfo[]>([
    ...uniqueExercises,
  ]);

  return (
    <DragDropContext
      onDragEnd={(result) => {
        if (!result.destination) {
          return;
        }
        console.log(result);
      }}
    >
      <Droppable droppableId="droppable-exercises">
        {(provided) => (
          <List {...provided.droppableProps} ref={provided.innerRef}>
            {[...exercises].map((exercise, index) => (
              <ExerciseListItem
                key={exercise.name}
                exercise={exercise}
                index={index}
              />
            ))}
            {provided.placeholder}
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
        )}
      </Droppable>
    </DragDropContext>
  );
}
