/* eslint-disable indent */
import {
    Accordion, AccordionDetails, AccordionSummary, List, ListItem, ListItemText, Typography,
    useTheme
} from '@mui/material';

/* eslint-enable indent */
import { advancedHints } from './hints';

export function AdvancedHintsExpand() {
  const theme = useTheme();

  return (
    <Accordion className="align-bottom">
      <AccordionSummary
        sx={{
          padding: `0px 0px`,
          margin: 0,
          color: theme.palette.text.secondary
        }}
      >
        <Typography
          sx={{ color: theme.palette.text.secondary }}>
          Advanced Hints
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <List sx={{ overflow: `auto`, maxHeight: `100%` }}>
          {advancedHints.map((hint) =>
            <ListItem key={hint}>
              <ListItemText>
                {hint}
              </ListItemText>
            </ListItem>
          )}
        </List>
      </AccordionDetails>
    </Accordion>
  );
}
