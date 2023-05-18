import { ExerciseProvider } from '@/components/shared/ExerciseProvider';
import { Card, List } from '@mui/material';

/* eslint-disable indent */
import {
    useCreateWorkoutContext as useCreateWorkoutContext
} from '../context/CreateWorkoutContextProvider';
/* eslint-enable indent */
import { NewExerciseButton } from './NewExerciseButton';
import Result from './result/Result';
import { ResultCard } from './result/ResultCard';

export function Results() {
  const { searchInput } = useCreateWorkoutContext();
  const { searchedExerciseNameResults, isSearching } = searchInput;

  return (
    <Card
      sx={{ padding: '5px 10px', overflow: 'auto', height: '100%' }}
      className="bg-slate-500"
      elevation={10}
    >
      <List className="w-full">
        {isSearching ? <ResultsSkeleton/> : searchedExerciseNameResults.map((exerciseName) =>
          <ExerciseProvider key={exerciseName} activityType='exercise' exerciseName={exerciseName}>
            <ResultCard>
              <Result />
            </ResultCard>
          </ExerciseProvider>
        )}
        <ResultCard>
          <NewExerciseButton />
        </ResultCard>
      </List>
    </Card>
  );
}

function ResultsSkeleton() {
  return null;
}
