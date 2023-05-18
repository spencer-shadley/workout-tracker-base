/* eslint-disable indent */
import {
    Accordion, AccordionDetails, AccordionSummary, List, ListItem, ListItemText, Typography
} from '@mui/material';

/* eslint-enable indent */
import { advancedHints } from './hints';

export function AdvancedHintsExpand() {
  return (
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
          {advancedHints.map((hint) =>
            <ListItem key={hint}>
              <ListItemText>{hint}</ListItemText>
            </ListItem>
          )}
        </List>
      </AccordionDetails>
    </Accordion>
  );
}
