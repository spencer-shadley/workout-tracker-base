import {
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import {
  AnswerType,
  answerTypes,
  useCreateWorkoutContext,
} from '../context/CreateWorkoutContextProvider';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

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
  const { aiPreferences } = useCreateWorkoutContext();
  const { answerStyle, setAnswerStyle } = aiPreferences;
  return (
    <Accordion sx={{ opacity: 1 }}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography>Settings</Typography>
        <Typography sx={{ color: 'text.secondary', marginLeft: '5px' }}>
          update how the answers are phrased
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <FormControl fullWidth>
          <InputLabel id="response-style-select">Answer Style</InputLabel>
          <Select
            native
            labelId="response-style-select-label"
            id="response-style-select"
            value={answerStyle}
            label={answerStyle}
            onChange={(e) => {
              console.log(e.target.value);
              setAnswerStyle(e.target.value as string);
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
      </AccordionDetails>
    </Accordion>
  );
}
