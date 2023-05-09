import { Card } from '@mui/material';
import { searchHints } from './hints';
import shuffle from 'lodash/shuffle';
import { ExampleSearches } from './ExampleSearches';
import { AdvancedHintsExpand } from './AdvancedHintsExpand';
import { HowToSearchText } from './HowToSearchText';

export const randomHints = shuffle(searchHints);

export function InitialSearchHint() {
  return (
    <div className="flex overflow-auto">
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
        </Card>
      </div>
      <div className="overflow-auto h-full">
        <ExampleSearches />
      </div>
    </div>
  );
}
