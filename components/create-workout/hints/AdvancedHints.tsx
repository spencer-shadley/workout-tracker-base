import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { Card, IconButton } from '@mui/material';

import { AdvancedHintsExpand } from './AdvancedHintsExpand';
import { HowToSearchText } from './HowToSearchText';

export function AdvancedHints({
  setShouldShowAdvancedHints,
}: {
  setShouldShowAdvancedHints: (shouldShowAdvancedHints: boolean) => void;
}) {
  return (
    <Card
      className='overflow-y-auto'
      elevation={10}
      sx={{
        padding: `10px`,
        height: `100%`,
        display: `flex`,
        flexDirection: `column`,
      }}
    >
      <HowToSearchText />
      <AdvancedHintsExpand />
      <IconButton
        onClick={() => setShouldShowAdvancedHints(false)}
        sx={{ alignSelf: `flex-end` }}
      >
        <ChevronLeftIcon />
      </IconButton>
    </Card>
  );
}
