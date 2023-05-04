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
import { setLocalStorageAiStyle } from '@/utils/localStorage';

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
  const { aiStyle, setAiStyle } = aiPreferences;
  return (
    <Accordion sx={{ opacity: 1 }}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography>Settings</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <FormControl fullWidth>
          <InputLabel id="response-style-select">Answer Style</InputLabel>
          <Select
            native
            labelId="response-style-select-label"
            id="response-style-select"
            value={aiStyle}
            label={aiStyle}
            onChange={(e) => {
              const aiStyle = e.target.value as string;
              setAiStyle(aiStyle);
              setLocalStorageAiStyle(aiStyle);
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
