import {
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  Grow,
} from '@mui/material';
import {
  AnswerType,
  answerTypes,
} from '../context/CreateWorkoutContextProvider';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useAiStyle } from '@/hooks/useLocalStorage';
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

export default function ResponseStyleOptions() {
  return (
    <Accordion sx={{ opacity: 1 }}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography>Settings</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <ResponseStyleOption />
      </AccordionDetails>
    </Accordion>
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
          <MenuItem value={10}>ten</MenuItem>
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
