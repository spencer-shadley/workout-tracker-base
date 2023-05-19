import '@/styles/globals.css';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useEffect, useState } from 'react';

import Background from '@/components/shared/backgrounds/Background';
import { Box, CircularProgress } from '@mui/material';
import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import Settings from '../components/settings/Settings';

import type { AppProps } from 'next/app';

dayjs.extend(relativeTime);

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  const [isPageLoaded, setIsPageLoaded] = useState<boolean>(false);

  useEffect(() => {
    setIsPageLoaded(true);
  }, []);

  return isPageLoaded ?
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <Background />
        <Component {...pageProps} />
        <ReactQueryDevtools initialIsOpen={false} />
        <Settings />
      </Hydrate>
    </QueryClientProvider>
    :
    <Box sx={{ display: `flex` }}>
      <CircularProgress
        sx={{
          position: `absolute`,
          top: `50%`,
          left: `50%`,
        }}
      />
    </Box>
  ;
}
