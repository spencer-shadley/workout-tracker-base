import { Card, IconButton } from '@mui/material';
import { searchHints } from './hints';
import shuffle from 'lodash/shuffle';
import { ExampleSearches } from './ExampleSearches';
import { AdvancedHintsExpand } from './AdvancedHintsExpand';
import { HowToSearchText } from './HowToSearchText';
import { useEffect, useState } from 'react';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useWindowSize } from 'usehooks-ts';

export const randomHints = shuffle(searchHints);

export function InitialSearchHint() {
  const { width } = useWindowSize();
  const [shouldShowAdvancedHints, setShouldShowAdvancedHints] = useState(
    width > 500
  );

  useEffect(() => {
    setShouldShowAdvancedHints(width > 800);
  }, [width]);

  return (
    <div className="flex overflow-auto">
      {shouldShowAdvancedHints && (
        <div className="flex flex-col flex-1">
          <Card
            elevation={10}
            sx={{
              padding: '10px',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <HowToSearchText />
            <AdvancedHintsExpand />
            <IconButton
              onClick={() => setShouldShowAdvancedHints(false)}
              sx={{ alignSelf: 'flex-end' }}
            >
              <ChevronLeftIcon />
            </IconButton>
          </Card>
        </div>
      )}
      {!shouldShowAdvancedHints && (
        <IconButton onClick={() => setShouldShowAdvancedHints(true)}>
          <ChevronRightIcon />
        </IconButton>
      )}
      <div
        className="overflow-auto h-full w-full "
        style={{ flexGrow: shouldShowAdvancedHints ? 2 : undefined }}
      >
        <ExampleSearches />
      </div>
    </div>
  );
}
