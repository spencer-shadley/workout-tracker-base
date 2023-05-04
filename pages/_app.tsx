import '@/styles/globals.css';

import type { AppProps } from 'next/app';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

import BackgroundWaves from '@/components/shared/BackgroundWaves';
import { Dialog, DialogContent, Fab } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import { ResponseStyleOption } from '@/components/create-workout/response-style/ResponseStyleOptions';
import { useState } from 'react';

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);

  return (
    <QueryClientProvider client={queryClient}>
      <BackgroundWaves />
      <Component {...pageProps} />
      <ReactQueryDevtools initialIsOpen={false} />

      <Fab
        size="small"
        color="secondary"
        aria-label="settings"
        sx={{
          position: 'absolute',
          bottom: '50px',
          right: '50px',
        }}
        onClick={() => setIsSettingsOpen(true)}
      >
        <SettingsIcon />
      </Fab>
      <Dialog open={isSettingsOpen} onClose={() => setIsSettingsOpen(false)}>
        <DialogContent>
          <ResponseStyleOption />
        </DialogContent>
      </Dialog>
    </QueryClientProvider>
  );
}
