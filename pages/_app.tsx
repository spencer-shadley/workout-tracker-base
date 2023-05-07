import '@/styles/globals.css';

import type { AppProps } from 'next/app';

import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

import Settings from '../components/shared/Settings';
import { useEffect, useState } from 'react';
import { Box, CircularProgress } from '@mui/material';
import BackgroundWaves from '@/components/shared/backgrounds/BackgroundWaves';
import { SimpleParticles } from '../components/shared/backgrounds/SimpleParticles';
import { useBackgroundPreference } from '@/hooks/useLocalStorage';
import {
  bounce,
  particles,
} from '@/components/shared/backgrounds/backgroundsTypes';
import { Fireworks } from '@/components/shared/backgrounds/Fireworks';
import { BounceParticles } from '@/components/shared/backgrounds/BounceParticles';

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  const [backgroundPreference] = useBackgroundPreference();

  const [isPageLoaded, setIsPageLoaded] = useState<boolean>(false);

  useEffect(() => {
    setIsPageLoaded(true);
  }, []);

  return isPageLoaded ? (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <BackgroundWaves />
        {backgroundPreference === particles && <SimpleParticles />}
        {backgroundPreference === bounce && <BounceParticles />}
        <Component {...pageProps} />
        <ReactQueryDevtools initialIsOpen={false} />
        <Settings />
      </Hydrate>
    </QueryClientProvider>
  ) : (
    <Box sx={{ display: 'flex' }}>
      <CircularProgress
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
        }}
      />
    </Box>
  );
}
