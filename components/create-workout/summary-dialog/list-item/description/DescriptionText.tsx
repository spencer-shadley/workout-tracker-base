import { useState } from 'react';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
/* eslint-disable indent */
import { Accordion, AccordionSummary, DialogContentText } from '@mui/material';

import { DescriptionDetails } from './DescriptionDetails';

/* eslint-enable indent */

export function DescriptionText() {
  const [shouldShowDescription, setShouldShowDescription] =
    useState<boolean>(false);

  return (
    <Accordion
      elevation={0}
      TransitionProps={{ unmountOnExit: true }}
      expanded={shouldShowDescription}
      onChange={() => setShouldShowDescription(!shouldShowDescription)}
      sx={{ width: '100%', padding: 0 }}
    >
      <AccordionSummary sx={{ padding: 0 }} expandIcon={<ExpandMoreIcon />}>
        <DialogContentText variant="subtitle2">
          {shouldShowDescription ? 'Hide' : 'Show'} description
        </DialogContentText>
      </AccordionSummary>
      <DescriptionDetails/>
    </Accordion>
  );
}

