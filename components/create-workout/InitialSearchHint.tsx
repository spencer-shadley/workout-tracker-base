import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material';
import { useCreateWorkoutContext } from './context/CreateWorkoutContextProvider';
import { hints } from './hints';
import SwitchAccessShortcutIcon from '@mui/icons-material/SwitchAccessShortcut';

export function InitialSearchHint() {
  const { searchInput } = useCreateWorkoutContext();
  const { setSearchText } = searchInput;

  return (
    <>
      <Typography variant="overline">Example searches</Typography>
      <List>
        {hints.map((hint) => (
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
        ))}
      </List>
    </>
  );
}
