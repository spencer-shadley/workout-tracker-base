import { FormControl, InputLabel, Select, Snackbar, Grow } from '@mui/material';
import {
  AnswerType,
  answerTypes,
} from '../context/CreateWorkoutContextProvider';
import { useAiStyle } from '@/hooks/storage/useLocalStorage';
import { useState } from 'react';

interface ResponseStyleOptionsProps {
  answerStyle: AnswerType;
}

function ResponseStyleMenuOption({ answerStyle }: ResponseStyleOptionsProps) {
  return (
    <option value={answerStyle.styleModifier}>
      {answerStyle.displayLabel}
    </option>
  );
}

export function ResponseStyleOption() {
  const [aiStyle, setAiStyle] = useAiStyle();
  const [isSuccessAlertOpen, setIsSuccessAlertOpen] = useState(false);

  return (
    <>
      <FormControl
        fullWidth
        sx={{
          marginTop: '10px',
        }}
      >
        <InputLabel id="response-style-select">Answer Style</InputLabel>
        <Select
          native
          labelId="response-style-select-label"
          id="response-style-select"
          value={aiStyle}
          label={aiStyle}
          onChange={(e) => {
            setAiStyle(e.target.value);
            setIsSuccessAlertOpen(true);
          }}
        >
          {answerTypes.map((answer) => (
            <ResponseStyleMenuOption
              key={answer.styleModifier}
              answerStyle={answer}
            />
          ))}
        </Select>
      </FormControl>
      <Snackbar
        open={isSuccessAlertOpen}
        onClose={() => setIsSuccessAlertOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        message="Successfully updated your style preference"
        autoHideDuration={2000}
        TransitionComponent={Grow}
      />
    </>
  );
}
