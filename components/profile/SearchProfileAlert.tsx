import { useState } from 'react';

import { getAllAboutPersonStorage } from '@/hooks/storage/useLocalStorage';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { Alert, IconButton, Tooltip } from '@mui/material';

import { ProfileDialog } from './ProfileDialog';

export function SearchProfileAlert() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <ProfileDialog isOpen={isOpen} close={() => setIsOpen(false)} />
      <Tooltip title={getAllAboutPersonStorage()} arrow>
        <Alert
          className='w-full'
          severity="info"
          action={<IconButton onClick={() => setIsOpen(true)}
            color='inherit' size='small'>
            <ManageAccountsIcon />
          </IconButton>}
        >
          Your search will automatically account for your unique profile.
        </Alert>
      </Tooltip>
    </>
  );
}
