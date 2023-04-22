import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import React from 'react';
import ExerciseList from '../exercise/ExerciseList';
import { TextField } from '@mui/material';
dayjs.extend(relativeTime);

export default function DialogContent() {
  const [aiPrompt, setAiPrompt] = React.useState<string>('');
  return (
    <DndProvider backend={HTML5Backend}>
      <TextField
        label="Ask for a workout"
        value={aiPrompt}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setAiPrompt(event.target.value);
          console.log(event.target.value);
        }}
      />
      <ExerciseList />
    </DndProvider>
  );
}
