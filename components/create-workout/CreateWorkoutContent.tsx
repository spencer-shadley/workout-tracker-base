import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  FormControl,
  FormControlLabel,
  Paper,
  Radio,
  RadioGroup,
  Typography,
} from '@mui/material';
import {
  AnswerStyle,
  useCreateWorkoutContext,
} from './context/CreateWorkoutContextProvider';
import { Results } from './results/Results';
import { ExerciseSearch } from './ExerciseSearch';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function CreateWorkoutContent() {
  const { searchInput, aiPreferences } = useCreateWorkoutContext();
  const { searchText, searchedExerciseNameResults, isSearching } = searchInput;
  const { answerStyle, setAnswerStyle } = aiPreferences;

  return (
    <Paper className="h-screen opacity-80 p-4 flex flex-col">
      {searchText === '' && <h1>Create an AI powered workout!</h1>}
      <Accordion sx={{ opacity: 1 }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Response style</Typography>
          <Typography sx={{ color: 'text.secondary', marginLeft: '5px' }}>
            update how the answers are generated
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormControl>
            <RadioGroup
              row
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue={AnswerStyle.PersonalTrainer}
              name="radio-buttons-group"
              value={answerStyle}
              onChange={(e) => {
                console.log(e.target.value);
                setAnswerStyle(e.target.value as AnswerStyle);
              }}
            >
              <FormControlLabel
                value={AnswerStyle.PersonalTrainer}
                control={<Radio />}
                label="personal trainer"
              />
              <FormControlLabel
                value={AnswerStyle.Shakespeare}
                control={<Radio />}
                label="Shakespeare"
              />
              <FormControlLabel
                value={AnswerStyle.Rap}
                control={<Radio />}
                label="Rap"
              />
              <FormControlLabel
                value={AnswerStyle.Haiku}
                control={<Radio />}
                label="Haiku"
              />
              <FormControlLabel
                value={AnswerStyle.Scared}
                control={<Radio />}
                label="scared"
              />
              <FormControlLabel
                value={AnswerStyle.Trump}
                control={<Radio />}
                label="Trump"
              />
              <FormControlLabel
                value={AnswerStyle.Biden}
                control={<Radio />}
                label="Biden"
              />
              <FormControlLabel
                value={AnswerStyle.Southern}
                control={<Radio />}
                label="Southern"
              />
              <FormControlLabel
                value={AnswerStyle.Spy}
                control={<Radio />}
                label="Spy"
              />
              <FormControlLabel
                value={AnswerStyle.Sergeant}
                control={<Radio />}
                label="Sergeant"
              />
              <FormControlLabel
                value={AnswerStyle.Caveman}
                control={<Radio />}
                label="Caveman"
              />
              <FormControlLabel
                value={AnswerStyle.Alien}
                control={<Radio />}
                label="Alien"
              />
              <FormControlLabel
                value={AnswerStyle.Joke}
                control={<Radio />}
                label="Joke"
              />
              <FormControlLabel
                value={AnswerStyle.Angry}
                control={<Radio />}
                label="Angry"
              />
              <FormControlLabel
                value={AnswerStyle.DogOwner}
                control={<Radio />}
                label="Dog Owner"
              />
            </RadioGroup>
          </FormControl>
        </AccordionDetails>
      </Accordion>
      <ExerciseSearch />
      {searchText && <GenerateWithAiButton />}
      <div className="overflow-auto">
        {isSearching ? <Typography>Searching...</Typography> : <Results />}
      </div>
      {searchText && searchedExerciseNameResults.length === 0 && (
        <NewExerciseButton />
      )}
    </Paper>
  );
}

function GenerateWithAiButton() {
  return <Button>Generate full workout with AI</Button>;
}

function NewExerciseButton() {
  return <Button>New Exercise</Button>;
}
