import { logError } from '@/utils/error';
import { PropsWithChildren, createContext, useContext } from 'react';

interface SearchInputType {
  searchText: string;
  setSearchText: (searchText: string) => void;
  searchedExerciseNameResults: string[];
  currentHint: string;
  isSearching: boolean;
}

export interface AnswerType {
  displayLabel: string;
  styleModifier: string;
}

export const answerTypes: AnswerType[] = [
  {
    displayLabel: 'PersonalTrainer',
    styleModifier:
      'a news anchor reporting on your exercise routine as if it were breaking news',
  },
  {
    displayLabel: 'Shakespeare',
    styleModifier: 'Shakespeare with Old English',
  },
  { displayLabel: 'Rap', styleModifier: 'rap' },
  { displayLabel: 'Haiku', styleModifier: 'haiku' },
  { displayLabel: 'Scared', styleModifier: 'scared' },
  { displayLabel: 'Trump', styleModifier: 'Donald Trump' },
  {
    displayLabel: 'Biden',
    styleModifier: 'mentally ill deranged person with bad memory and a low IQ',
  },
  {
    displayLabel: 'Uwu',
    styleModifier: 'streamer girl with lots of really cute uwu speak',
  },
  {
    displayLabel: 'Southern',
    styleModifier: 'Texan cowboy with a really rough speaking pattern',
  },
  {
    displayLabel: 'Spy',
    styleModifier:
      'a covert spy who does not want to actually reveal any info about the exercise or activity at all. Nothing at all.',
  },
  {
    displayLabel: 'Sergeant',
    styleModifier: 'commanding army sergeant barking orders and insulting you',
  },
  { displayLabel: 'Caveman', styleModifier: 'caveman' },
  {
    displayLabel: 'Alien',
    styleModifier: 'an alien who does not know what a human is',
  },
  {
    displayLabel: 'Joke',
    styleModifier: 'a joke. Include a joke about this exercise',
  },
  {
    displayLabel: 'Angry',
    styleModifier: 'an extremely angry irritated person who is very mad at you',
  },
  {
    displayLabel: 'DogOwner',
    styleModifier: 'someone who cannot stop bringing up how cute their dog is',
  },
];

export interface CreateWorkoutType {
  searchInput: SearchInputType;
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
