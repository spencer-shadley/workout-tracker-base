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
} from '../context/CreateWorkoutContextProvider';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useAiStyle } from '@/hooks/useLocalStorage';

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
  const [aiStyle, setAiStyle] = useAiStyle();

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
              setAiStyle(e.target.value);
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
