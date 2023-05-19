import { ExerciseProvider } from '@/components/shared/ExerciseProvider';
import { Card, List } from '@mui/material';

/* eslint-disable indent */
import {
    useCreateWorkoutContext as useCreateWorkoutContext
} from '../context/CreateWorkoutContextProvider';
/* eslint-enable indent */
import { ResultCard } from './result/ResultCard';
import { ResultsSkeleton } from './ResultsSkeleton';

export function Results() {
  const { searchInput } = useCreateWorkoutContext();
  const { searchedExerciseNameResults, isSearching, searchText } = searchInput;

  return (
    <Card
      sx={{ padding: `5px 10px`, overflow: `auto`, height: `100%` }}
      className="bg-slate-500"
      elevation={10}
    >
      <List className="w-full">
        <ExerciseProvider activityType='exercise' exerciseName={`"${searchText}"`}>
          <ResultCard/>
        </ExerciseProvider>
        {isSearching ? <ResultsSkeleton/> : searchedExerciseNameResults.map((exerciseName) =>
          <ExerciseProvider key={exerciseName} activityType='exercise' exerciseName={exerciseName}>
            <ResultCard/>
          </ExerciseProvider>
        )}
      </List>
    </Card>
  );
}

