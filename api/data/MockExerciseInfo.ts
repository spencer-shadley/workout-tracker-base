import ExerciseInfo from '../../components/shared/interfaces/ExerciseInfo';

const shuffleArray = (array: Array<unknown>) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

const generateRandomInt = (
  max: number,
  undefinedFrequency: number
): number | undefined => {
  return Math.random() < undefinedFrequency
    ? undefined
    : Math.floor(Math.random() * max);
};

const generateRandomDateWithinDays = (numberOfDays: number): Date => {
  return new Date(
    Date.now() - Math.random() * numberOfDays * 24 * 60 * 60 * 1000
  );
};

const generateExercise = (name: string): ExerciseInfo => {
  return {
    name,
    numberOfTimesCompleted: generateRandomInt(100, 0.2),
    maxWeight: generateRandomInt(1000, 0.5),
    lastCompleted: generateRandomDateWithinDays(100),
  };
};

export const sampleExercises: ExerciseInfo[] = [
  generateExercise('pushups'),
  generateExercise('situps'),
  generateExercise('pullups'),
  generateExercise('tire throws'),
  generateExercise('plank'),
  generateExercise('bench press'),
  generateExercise('deadlift'),
  generateExercise('overhead press'),
  generateExercise('dumbbell bench press'),
  generateExercise('monster walks'),
  generateExercise('tricep pulldowns'),
  generateExercise('jumprope'),
  generateExercise('kettlebell swings'),
  generateExercise('preacher curls'),
  generateExercise('alternating dumbbell curls'),
];

export const makeRandomFakeExercises = (): Array<ExerciseInfo> => {
  const copy = [...sampleExercises];
  shuffleArray(copy);
  return copy;
};
