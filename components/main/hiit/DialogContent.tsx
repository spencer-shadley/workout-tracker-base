import ExerciseInfo from '@/components/shared/ExerciseInfo';
import {
  List,
  ListItemAvatar,
  Avatar,
  ListItemText,
  ListItemButton,
} from '@mui/material';
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
        <ListItemButton key={mostRecentExercise.name}>
          <ListItemAvatar>
            <Avatar>{/* <FolderIcon /> */}</Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={mostRecentExercise.name}
            secondary={mostRecentExercise.description}
          />
        </ListItemButton>
      ))}
    </List>
  );
}
