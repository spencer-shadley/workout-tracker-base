import ExerciseInfo from '@/components/shared/ExerciseInfo';
import {
  List,
  ListItemAvatar,
  Avatar,
  ListItemText,
  ListItemButton,
  ListItem,
  IconButton,
} from '@mui/material';

import { InfoOutlined, FitnessCenter } from '@mui/icons-material';
// list of past exercises
// top 5 most recent, filtered as you type
// top 5 most used

// option to add

// TODO: create github issues
// TODO: add icons

// TODO: localstorage or db
const mostRecentExercises: ExerciseInfo[] = [
  { name: 'pushups', numberOfTimesCompleted: 0 },
  { name: 'situps', numberOfTimesCompleted: 0 },
  { name: 'pullups', numberOfTimesCompleted: 0 },
  { name: 'tire throws', numberOfTimesCompleted: 0 },
  { name: 'bench press', numberOfTimesCompleted: 0, maxWeight: 200 },
  {
    name: 'deadlift',
    numberOfTimesCompleted: 0,
    maxWeight: 300,
    description: 'do you even lift bro?',
  },
];

export default function DialogContent() {
  return (
    <List>
      {mostRecentExercises.map((mostRecentExercise) => (
        <ListItem
          key={mostRecentExercise.name}
          secondaryAction={
            <IconButton aria-label="comment">
              <InfoOutlined />
            </IconButton>
          }
        >
          <ListItemButton>
            <ListItemAvatar>
              <Avatar>
                <FitnessCenter />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={mostRecentExercise.name}
              secondary={mostRecentExercise.description}
            />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
}
