import { useProfileLocalStorage } from '@/hooks/storage/useLocalStorage';
import { TextField } from '@mui/material';

import { ProfilePrompt } from './ProfilePrompt';

export function ProfileSetting({ prompt, localStorageKey }: ProfilePrompt) {
  const [about, setAbout] = useProfileLocalStorage(localStorageKey);

  return (
    <TextField
      className='py-2'
      margin='normal'
      multiline
      helperText={prompt}
      label={localStorageKey}
      fullWidth value={about ?? ``}
      onChange={(e) => {
        setAbout(e.target.value ?? ``);
      }} />
  );
}
