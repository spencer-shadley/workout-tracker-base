import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import React from 'react';
import ExerciseList from '../exercise/ExerciseList';
dayjs.extend(relativeTime);

export default function DialogContent() {
  return (
    <DndProvider backend={HTML5Backend}>
      <ExerciseList />
    </DndProvider>
  );
}
