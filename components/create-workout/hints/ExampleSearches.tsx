import {
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListProps,
} from '@mui/material';
import { useCreateWorkoutContext } from '../context/CreateWorkoutContextProvider';
import { randomHints } from './InitialSearchHint';
import { AutoFixHigh, Search } from '@mui/icons-material';
import { AiDialog } from '../summary-dialog/AiDialog';
import { useState } from 'react';

export function ExampleSearches(props: ListProps) {
  const { searchInput } = useCreateWorkoutContext();
  const { setSearchText } = searchInput;
  const [showDialog, setShowDialog] = useState<boolean>(false);

  return (
    <List {...props}>
      {randomHints.map((hint, index) => (
        <div key={hint}>
          <ListItem sx={{ display: 'flex' }} key={hint}>
            <ListItemText sx={{ flexGrow: 1 }}>{hint}</ListItemText>
            <Button
              onClick={() => {
                setShowDialog(true);
              }}
              endIcon={<AutoFixHigh />}
            >
              generate
            </Button>
            <Button
              onClick={() => {
                setSearchText(hint);
              }}
              endIcon={<Search />}
            >
              Search
            </Button>
          </ListItem>
          {index < randomHints.length - 1 && <Divider />}
        </div>
      ))}
      <AiDialog showDialog={showDialog} setShowDialog={setShowDialog} />
    </List>
  );
}
