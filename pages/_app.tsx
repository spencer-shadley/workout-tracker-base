import '@/styles/globals.css';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { FlagsProvider } from 'flagged';
import { useEffect, useState } from 'react';

import Background from '@/components/shared/backgrounds/Background';
import { Box, CircularProgress, createTheme, ThemeProvider } from '@mui/material';
import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import Settings from '../components/settings/Settings';

import type { AppProps } from 'next/app';
dayjs.extend(relativeTime);

const queryClient = new QueryClient();

const theme = createTheme({
  palette: {
    primary: {
      main: `#FF8F1F`, // orange
    },
    secondary: {
      main: `#FFF469`, // pale yellow
    },
    info: {
      main: `#9EE854`, // green
    },
    background: {
      default: `#3A523C`, // very dark green
    },
    text: {
      primary: `#FFFFFF`, // white
      secondary: `#ddd`, // gray
    }
  }
})

export default function App({ Component, pageProps }: AppProps) {
  const [isPageLoaded, setIsPageLoaded] = useState<boolean>(false);

  useEffect(() => {
    setIsPageLoaded(true);
  }, []);

  return (
    <FlagsProvider features={{ welcomeTutorial: false }}>
      <ThemeProvider theme={theme}>
        {isPageLoaded ?
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
          </Box>}
      </ThemeProvider>
    </FlagsProvider>
  ) ;
}
