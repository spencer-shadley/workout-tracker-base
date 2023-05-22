import { ExerciseProvider } from '@/components/shared/ExerciseProvider';

import { ResultListItem } from './result/ResultListItem';

export function ResultsSkeleton() {
  return <>
    {Array<React.ReactElement>(10).fill(
      <ExerciseProvider activityType='exercise' exerciseName={null} key={Math.random()}>
        <ResultListItem />
      </ExerciseProvider>)}
  </>;
}
