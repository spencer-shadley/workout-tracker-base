import '@/styles/globals.css';
import { ThemeProvider } from 'next-themes';

import type { AppProps } from 'next/app';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

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

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <DndProvider backend={HTML5Backend}>
        <Component {...pageProps} />
      </DndProvider>
    </ThemeProvider>
  );
}
