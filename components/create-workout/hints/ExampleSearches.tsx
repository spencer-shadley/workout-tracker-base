import {
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListProps,
} from '@mui/material';
import { useCreateWorkoutContext } from '../context/CreateWorkoutContextProvider';
import SwitchAccessShortcutIcon from '@mui/icons-material/SwitchAccessShortcut';
import { randomHints } from './InitialSearchHint';

export function ExampleSearches(props: ListProps) {
  const { searchInput } = useCreateWorkoutContext();
  const { setSearchText } = searchInput;

  return (
    <List {...props}>
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
  );
}
