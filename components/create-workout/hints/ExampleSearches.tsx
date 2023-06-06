/* eslint-disable indent */
import { useState } from 'react';

import { AutoFixHigh, Search } from '@mui/icons-material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
    Accordion, AccordionDetails, AccordionSummary, Button, ButtonGroup, Divider, List, ListItem,
    ListItemText, Typography, useTheme
} from '@mui/material';

import { useCreateWorkoutContext } from '../context/CreateWorkoutContextProvider';
import { AiDialog } from '../summary-dialog/AiDialog';
import { randomHints } from './InitialSearchHint';

export function ExampleSearches() {
  const theme = useTheme();
  const { searchInput } = useCreateWorkoutContext();
  const { setSearchText } = searchInput;
  const [showDialog, setShowDialog] = useState<boolean>(false);

  return (
    <>
      <Accordion
      sx={{ color: theme.palette.text.secondary }}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon color='inherit'/>}>
          <Typography color='inherit'>
            See Example Searches
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <List>
            {randomHints.map((hint, index) =>
              <div key={hint}>
                <ListItem
              sx={{ display: `flex` }}
              key={hint}>
                  <ListItemText
                color="text.secondary"
                sx={{ flexGrow: 1, color: theme.palette.text.secondary }}>
                    {hint}
                  </ListItemText>
                  <ButtonGroup
                size='small'
                color='primary'
                orientation='vertical'
                variant='outlined'
                className='ml-1'>
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
                  </ButtonGroup>
                </ListItem>
                {index < randomHints.length - 1 && <Divider />}
              </div>
        )}
            <AiDialog showDialog={showDialog} setShowDialog={setShowDialog} />
          </List>
        </AccordionDetails>
      </Accordion>
    </>
  );
}
