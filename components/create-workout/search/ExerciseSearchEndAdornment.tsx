import { InputAdornment } from '@mui/material';

import { ExerciseCartButton } from './ExerciseCartButton';
import { GenerateWithAiButton } from './GenerateWithAiButton';

export function ExerciseSearchEndAdornment() {
  return <InputAdornment position="end">
    <GenerateWithAiButton />
    <ExerciseCartButton />
  </InputAdornment>;
}
