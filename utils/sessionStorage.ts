import { WorkoutOptions } from '../components/main/workout/WorkoutOptions';
import { logError } from './error';

const sessionStorageKey = 'ai-workout-info';
const initialSession: SessionInfo = {
  selectedExercises: [],
  options: {
    numberOfRounds: 3,
    restBetweenRoundsInSeconds: 90,
    restBetweenExercisesInSeconds: 15,
    exerciseDurationInSeconds: 45,
  },
};

export function getSessionInfo(): SessionInfo {
  try {
    const createWorkoutContextRaw =
      sessionStorage.getItem(sessionStorageKey) ?? '';
    return JSON.parse(createWorkoutContextRaw);
  } catch (e) {
    logError(e);
    return initialSession;
  }
}

function setSessionInfo(sessionInfo: SessionInfo) {
  sessionStorage.setItem(sessionStorageKey, JSON.stringify(sessionInfo));
}

export function addExercise(exerciseName: string) {
  const sessionInfo = getSessionInfo();
  sessionInfo.selectedExercises.push(exerciseName);
  setSessionInfo(sessionInfo);
}

/**
 * Information about the workout session
 * Essentially anything that is relevant across pages
 * Things only relevant to a particular page should
 * be stored in a relevant React Context instead
 */
interface SessionInfo {
  selectedExercises: string[];
  options: WorkoutOptions;
}
