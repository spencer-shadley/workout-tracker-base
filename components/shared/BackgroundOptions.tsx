import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useBackgroundPreference } from '@/hooks/useLocalStorage';
import { logError } from '@/utils/logger';
import { bounce, colors, particles } from './backgrounds/backgroundsTypes';

export function BackgroundOptions() {
  const [backgroundOption, setBackgroundOption] = useBackgroundPreference();

  return (
    <FormControl
      fullWidth
      sx={{
        marginTop: '10px',
      }}
    >
      <InputLabel id="background-select">Background style</InputLabel>
      <Select
        labelId="background-select-label"
        id="background-select"
        value={backgroundOption}
        label={backgroundOption}
        onChange={(e) => {
          const value = e.target.value;
          switch (value) {
            case particles:
              setBackgroundOption(particles);
              break;
            case colors:
              setBackgroundOption(colors);
              break;
            case bounce:
              setBackgroundOption(bounce);
              break;
            default:
              logError(`Invalid background option ${value}`);
          }
        }}
      >
        <MenuItem value={particles}>{particles}</MenuItem>
        <MenuItem value={colors}>{colors}</MenuItem>
        <MenuItem value={bounce}>{bounce}</MenuItem>
      </Select>
    </FormControl>
  );
}
