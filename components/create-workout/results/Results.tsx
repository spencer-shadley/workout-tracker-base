import { Card, List } from '@mui/material';
import { useCreateWorkoutContext as useCreateWorkoutContext } from '../context/CreateWorkoutContextProvider';
import Result from './result/Result';
import { ResultCard } from './result/ResultCard';
import { NewExerciseButton } from './NewExerciseButton';
import { useEffect, useState } from 'react';

const skeletonNames = makeSkeletonNames();

export function Results() {
  const { searchInput } = useCreateWorkoutContext();
  const { searchedExerciseNameResults, isSearching } = searchInput;
  const [names, setNames] = useState<string[]>(skeletonNames);

  useEffect(() => {
    if (isSearching) {
      setNames(skeletonNames);
    } else {
      setNames(searchedExerciseNameResults);
    }
  }, [isSearching, searchedExerciseNameResults]);

  return (
    <Card
      sx={{ padding: '5px 10px', overflow: 'auto', height: '100%' }}
      className="bg-slate-500"
      elevation={10}
    >
      <List className="w-full">
        {names.map((exerciseName) => (
          <ResultCard key={exerciseName} exerciseName={exerciseName}>
            <Result exerciseName={exerciseName} />
          </ResultCard>
        ))}
        <ResultCard exerciseName="new-exercise">
          <NewExerciseButton />
        </ResultCard>
      </List>
    </Card>
  );
}

function makeSkeletonNames() {
  const names = [];
  for (let i = 0; i < 10; i++) {
    names.push(`${Math.random()}`);
  }

  return names;
}
