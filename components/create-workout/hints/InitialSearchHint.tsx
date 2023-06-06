import shuffle from 'lodash/shuffle';
import { useEffect, useState } from 'react';
import { useWindowSize } from 'usehooks-ts';

import { GenericDialogProps } from '@/components/shared/PromptDialog';
import CustomizeToIndividual from '@/components/welcome/CustomizeToIndividual';
import { getAllAboutPersonStorage } from '@/hooks/storage/useLocalStorage';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import {
    Alert, Button, Dialog, DialogContent, DialogTitle, IconButton, Tooltip
} from '@mui/material';

import { AdvancedHints } from './AdvancedHints';
import { ExampleSearches } from './ExampleSearches';
import { searchHints } from './hints';

// import MenuIcon from '@mui/icons-material/Menu';
// import InboxIcon from '@mui/icons-material/MoveToInbox';

export const randomHints = shuffle(searchHints);

// const DrawerHeader = styled('div')(({ theme }) => ({
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'flex-end',
//   padding: theme.spacing(0, 1),
//   // necessary for content to be below app bar
//   ...theme.mixins.toolbar,
// }));

export function InitialSearchHint() {
  const { width } = useWindowSize();
  const [shouldShowAdvancedHints, setShouldShowAdvancedHints] = useState(
    width > 500
  );

  useEffect(() => {
    setShouldShowAdvancedHints(width > 800);
  }, [width]);

  // const [open, setOpen] = React.useState(false);

  // const handleDrawerOpen = () => {
  //   setOpen(true);
  // };

  // const handleDrawerClose = () => {
  //   setOpen(false);
  // };

  return (
    <>
      {/* <AppBar>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Mini variant drawer
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            <ChevronRightIcon />
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text) => (
            <ListItem key={text} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {<InboxIcon />}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['All mail', 'Trash', 'Spam'].map((text) => (
            <ListItem key={text} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {<InboxIcon />}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer> */}
      <div>
        {shouldShowAdvancedHints &&
          <div className="flex flex-col flex-1">
            <AdvancedHints
              setShouldShowAdvancedHints={setShouldShowAdvancedHints}
            />
          </div>
        }
        {!shouldShowAdvancedHints &&
          <IconButton onClick={() => setShouldShowAdvancedHints(true)}>
            <ChevronRightIcon />
          </IconButton>
        }
        <div
          style={{ flexGrow: shouldShowAdvancedHints ? 2 : undefined }}
        >
          <SearchProfileAlert />
          <ExampleSearches />
        </div>
      </div>
    </>
  );
}

function SearchProfileAlert() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <ProfileDialog isOpen={isOpen} close={() => setIsOpen(false)} />
      <Tooltip title={getAllAboutPersonStorage()} arrow>
        <Alert
          className='w-full'
          severity="info"
          action={
            <IconButton onClick={() => setIsOpen(true)}
              color='inherit' size='small'>
              <ManageAccountsIcon />
            </IconButton>}
        >
          Your search will automatically account for your unique profile.
        </Alert>
      </Tooltip>
    </>
  )
}

function ProfileDialog({ close, isOpen }: GenericDialogProps) {
  return (
    <Dialog
      open={isOpen}
      onClose={close}
      scroll='paper'>
      <DialogTitle>
        Profile
      </DialogTitle>
      <DialogContent>
        <CustomizeToIndividual shouldShowNext={false} />
      </DialogContent>
    </Dialog>
  )
}
