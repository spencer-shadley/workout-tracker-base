import { useAboutPersonStorage } from '@/hooks/storage/useLocalStorage';
import { TextField } from '@mui/material';

import { ProfilePrompt } from './ProfilePrompt';

export function ProfileSetting({ prompt, localStorageKey }: ProfilePrompt) {
  const [about, setAbout] = useAboutPersonStorage(localStorageKey);

  return (
    <TextField
      className='py-2'
      label={prompt}
      fullWidth value={about ?? ``}
      onChange={(e) => {
        setAbout(e.target.value ?? ``);
      }} />
  );
}
