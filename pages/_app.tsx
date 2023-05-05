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

import BackgroundWaves from '@/components/shared/BackgroundWaves';
import Settings from '../components/shared/Settings';
import { useEffect, useState } from 'react';
import { Typography } from '@mui/material';

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  const [isPageLoaded, setIsPageLoaded] = useState<boolean>(false);

  useEffect(() => {
    setIsPageLoaded(true);
  }, []);

  return isPageLoaded ? (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <BackgroundWaves />
        <Component {...pageProps} />
        <ReactQueryDevtools initialIsOpen={false} />
        <Settings />
      </Hydrate>
    </QueryClientProvider>
  ) : (
    <Typography>Loading...</Typography>
  );
}
