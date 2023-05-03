import { logError } from '@/utils/error';
import { PropsWithChildren, createContext, useContext } from 'react';

interface SearchInputType {
  searchText: string;
  setSearchText: (searchText: string) => void;
  searchedExerciseNameResults: string[];
  currentHint: string;
  isSearching: boolean;
}

export enum AnswerStyle {
  PersonalTrainer = 'Indian person with a strong Indian accent',
  Shakespeare = 'Shakespeare with Old English',
  Rap = 'rap',
  Haiku = 'haiku',
  Scared = 'scared',
  Trump = 'Donald Trump',
  Biden = 'mentally ill deranged person with bad memory and a low IQ',
  Uwu = 'streamer girl with lots of really cute uwu speak',
  Southern = 'Texan cowboy with a really rough speaking pattern',
  Spy = 'a covert spy who does not want to actually reveal any info about the exercise or activity at all. Nothing at all.',
  Sergeant = 'commanding army sergeant barking orders and insults at you',
  Caveman = 'caveman',
  Alien = 'an alien who does not know what a human is',
  Joke = 'a joke. Include a joke about this exercise',
  Angry = 'an extremely angry irritated person who is very mad at you',
  DogOwner = 'someone who cannot stop bringing up how cute their dog is',
}

interface AiPreferences {
  answerStyle: AnswerStyle;
  setAnswerStyle: (answerStyle: AnswerStyle) => void;
}

interface ExercisesCartType {
  addedExerciseNames: string[];
  addExerciseNameToCart: (exerciseName: string) => void;
  removeExerciseNameFromCart: (exerciseName: string) => void;
}

export interface CreateWorkoutType {
  searchInput: SearchInputType;
  exercisesCart: ExercisesCartType;
  aiPreferences: AiPreferences;
}

export const CreateWorkout = createContext<CreateWorkoutType>({
  searchInput: {
    isSearching: false,
    searchText: '',
    currentHint: '',
    searchedExerciseNameResults: [],
    setSearchText: () => {
      logError('set search text not set');
    },
  },
  exercisesCart: {
    addedExerciseNames: [],
    addExerciseNameToCart: () => {
      logError('add exercise to cart not set');
    },
    removeExerciseNameFromCart: () => {
      logError('remove exercise from cart not set');
    },
  },
  aiPreferences: {
    answerStyle: AnswerStyle.PersonalTrainer,
    setAnswerStyle: () => {
      logError('set answer style not set');
    },
  },
});

export const useCreateWorkoutContext = () => useContext(CreateWorkout);

interface CreateWorkoutProviderProps extends PropsWithChildren {
  createWorkout: CreateWorkoutType;
}

export const CreateWorkoutProvider = ({
  createWorkout,
  children,
}: CreateWorkoutProviderProps) => (
  <CreateWorkout.Provider value={createWorkout}>
    {children}
  </CreateWorkout.Provider>
);
