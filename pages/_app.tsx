import '@/styles/globals.css';
import { ThemeProvider } from 'next-themes';

import type { AppProps } from 'next/app';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import tryInitFirebase from '@/utils/initFirebase';

tryInitFirebase();

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  console.log(Component, pageProps);
  return (
    <ThemeProvider>
      <DndProvider backend={HTML5Backend}>
        <QueryClientProvider client={queryClient}>
          <div className="wave" />
          <div className="wave" />
          <div className="wave" />
          <div className="wave" />
          <div className="wave" />
          <div className="wave" />
          <Component {...pageProps} />
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </DndProvider>
    </ThemeProvider>
  );
}
