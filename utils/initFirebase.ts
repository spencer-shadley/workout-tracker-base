import { initializeApp } from 'firebase/app';
import { getAnalytics, isSupported } from 'firebase/analytics';
import { logError } from './error';

export default function tryInitFirebase() {
  try {
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
  } catch (e: unknown) {
    logError(`${e}`);
  }
}
