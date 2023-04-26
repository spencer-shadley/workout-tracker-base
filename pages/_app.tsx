import '@/styles/globals.css';
import { ThemeProvider } from 'next-themes';

import type { AppProps } from 'next/app';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics, isSupported } from 'firebase/analytics';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
dayjs.extend(relativeTime);

isSupported().then((supported) => {
  if (supported) {
    console.log('Firebase Analytics is supported');

    // Your web app's Firebase configuration
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    const firebaseConfig = {
      apiKey: 'AIzaSyBEyCRZmeaRqKvj7FQqKI-4K6f88j_sHis',
      authDomain: 'workout-tracker-5e40b.firebaseapp.com',
      projectId: 'workout-tracker-5e40b',
      storageBucket: 'workout-tracker-5e40b.appspot.com',
      messagingSenderId: '6430223735',
      appId: '1:6430223735:web:336a791eb64bbcf6228572',
      measurementId: 'G-RL5PN6MMGC',
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(app);
    console.log(analytics);
  } else {
    console.log('Firebase Analytics is not supported');
  }
});

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
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
        </QueryClientProvider>
      </DndProvider>
    </ThemeProvider>
  );
}
