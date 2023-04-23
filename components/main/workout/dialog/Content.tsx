import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import React from 'react';
import ExerciseList from '../exercise/ExerciseList';
import { Button, Dialog, FormGroup, TextField } from '@mui/material';
import { askQuestion } from '@/components/api/openai';
import AiWorkoutList from '@/components/ai-generated-workout/AiWorkoutList';
dayjs.extend(relativeTime);

export default function DialogContent() {
  const [aiPrompt, setAiPrompt] = React.useState<string>('');
  const [aiResponse, setAiResponse] = React.useState<string>('');
  const [isAiDialogOpen, setIsAiDialogOpen] = React.useState<boolean>(false);

  const makeWorkout = () => {
    const detailedAiPrompt = `${aiPrompt}. The response should be valid JSON. Only return valid JSON. It is very important that the response is completely valid JSON. The JSON should have a key of "exercises" with a value of an array of exercises, each of which must also be valid JSON. Each exercise should be formatted as valid json with the interface {title:string, numberOfSets: number, numberOfReps: number, description: string}  It is okay for each exercise to have different numberOfSets and numberOfReps. The result should not be a numbered list. The result should be JSON as described earlier. `;
    askQuestion(detailedAiPrompt).then((response) => {
      setAiResponse(response.data.choices[0].text ?? '');
    });
    setIsAiDialogOpen(true);
  };

  return (
    <>
      <DndProvider backend={HTML5Backend}>
        <FormGroup
          sx={{ marginTop: 3 }}
          row
          onSubmit={() => {
            console.log('submit');
          }}
        >
          <TextField
            sx={{ flexGrow: 1 }}
            type="text"
            label="Ask for a workout"
            value={aiPrompt}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setAiPrompt(event.target.value);
            }}
          />
          <Button
            disabled={!aiPrompt}
            type="submit"
            onClick={() => {
              makeWorkout();
            }}
          >
            Make custom workout
          </Button>
          <Button
            onClick={() => {
              setAiPrompt('make a tricep workout');
              makeWorkout();
            }}
          >
            Make example workout
          </Button>
        </FormGroup>
        <ExerciseList />
      </DndProvider>
      <Dialog
        open={isAiDialogOpen}
        onClose={() => {
          setIsAiDialogOpen(false);
          setAiResponse('');
        }}
      >
        <AiWorkoutList
          rawAiResponse={aiResponse}
          aiPrompt={aiPrompt}
          retry={makeWorkout}
        />
      </Dialog>
    </>
  );
}
