import { profilePromptMap } from '@/hooks/storage/useLocalStorage';

import { ProfileSetting } from './ProfileSetting';

export function ProfileSettings() {
  const prompts = Array.from(profilePromptMap);
  return <div className='m-5'>
    {prompts.map(([localStorageKey, prompt]) => <ProfileSetting key={localStorageKey} localStorageKey={localStorageKey} prompt={prompt} />)}
  </div>;
}
