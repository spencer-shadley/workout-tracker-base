import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Card,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material';
import { useCreateWorkoutContext } from './context/CreateWorkoutContextProvider';
import { searchHints } from './hints';
import SwitchAccessShortcutIcon from '@mui/icons-material/SwitchAccessShortcut';
import shuffle from 'lodash/shuffle';

const randomHints = shuffle(searchHints);

const advancedHints = [
  'Exclude [X equipment]',
  'Only show exercises with [X equipment]',
  'On a 1-10 scale, I want to feel [X intensity]',
];

export function InitialSearchHint() {
  const { searchInput } = useCreateWorkoutContext();
  const { setSearchText } = searchInput;

  return (
    <div className="flex overflow-auto">
      <div className="flex flex-col flex-1">
        <Card
          elevation={10}
          sx={{
            padding: '10px',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <article className="flex-1 flex-col">
            <Typography variant="overline">Example searches</Typography>
            <br />
            <Typography variant="body2">
              Click a hint to search the example text
            </Typography>
            <Divider />

            <Typography variant="overline">About</Typography>
            <br />
            <Typography variant="body2">
              Nothing is pre-scripted. Everything is generated to your exact
              search!
            </Typography>
            <br />
            <Typography variant="body2">
              This means you can be highly specific. Search for exercises,
              workouts, muscle groups, physical restrictions, etc. These can
              even be chained together.
            </Typography>
            <br />
            <Typography variant="body2">
              For example, append &quot;Keep in mind I only have dumbbells&quot;
              to the end of your search to filter out exercises that require
              barbells.
            </Typography>
          </article>
          <Accordion className="align-bottom">
            <AccordionSummary
              sx={{
                padding: '0px 0px',
                margin: 0,
              }}
            >
              <Typography>Advanced Hints</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <List sx={{ overflow: 'auto', maxHeight: '100%' }}>
                {advancedHints.map((hint) => (
                  <ListItem key={hint}>
                    <ListItemText>{hint}</ListItemText>
                  </ListItem>
                ))}
              </List>
            </AccordionDetails>
          </Accordion>
        </Card>
      </div>
      <div className="overflow-auto h-full">
        <List className="flex-2">
          {randomHints.map((hint, index) => (
            <div key={hint}>
              <ListItem key={hint}>
                <ListItemButton
                  onClick={() => {
                    setSearchText(hint);
                  }}
                >
                  <SwitchAccessShortcutIcon
                    sx={{
                      marginRight: '10px',
                      color: 'gray',
                    }}
                  />
                  <ListItemText>{hint}</ListItemText>
                </ListItemButton>
              </ListItem>
              {index < randomHints.length - 1 && <Divider />}
            </div>
          ))}
        </List>
      </div>
    </div>
  );
}
