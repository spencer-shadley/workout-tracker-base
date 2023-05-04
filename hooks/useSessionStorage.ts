import { WorkoutOptions } from '@/components/main/workout/WorkoutOptions';
import { useSessionStorage } from 'usehooks-ts';

const sessionStorageKey = 'ai-workout-info';

export const initialSession: SessionInfo = {
  selectedExercises: [],
  options: {
    numberOfRounds: 3,
    restBetweenRoundsInSeconds: 90,
    restBetweenExercisesInSeconds: 15,
    exerciseDurationInSeconds: 45,
  },
};

/**
 * Information about the workout session
 * Essentially anything that is relevant across pages
 * Things only relevant to a particular page should
 * be stored in a relevant React Context instead
 */
export interface SessionInfo {
  selectedExercises: string[];
  options: WorkoutOptions;
}

function useSession() {
  return useSessionStorage<SessionInfo>(sessionStorageKey, initialSession);
}

export function useAddExerciseName(exerciseName: string) {
  const [sessionInfo, setSessionInfo] = useSession();

  return () => {
    sessionInfo.selectedExercises.push(exerciseName);
    setSessionInfo(sessionInfo);
  };
}

export function useRemoveExerciseName(exerciseName: string) {
  const [sessionInfo, setSessionInfo] = useSession();

  return () => {
    sessionInfo.selectedExercises.filter((name) => name !== exerciseName);
    setSessionInfo(sessionInfo);
  };
}

export function useGetExerciseNames() {
  const [sessionInfo] = useSession();
  const { selectedExercises } = sessionInfo;
  return selectedExercises;
}

export function useSetSessionInfo(sessionInfo: SessionInfo) {
  const [, setSessionInfo] = useSession();
  return () => setSessionInfo(sessionInfo);
}
