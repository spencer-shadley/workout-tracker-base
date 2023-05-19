import { ExerciseProvider } from '@/components/shared/ExerciseProvider';

import { ResultCard } from './result/ResultCard';

export function ResultsSkeleton() {
  return <>
    {Array<React.ReactElement>(10).fill(
      <ExerciseProvider activityType='exercise' exerciseName={null} key={Math.random()}>
        <ResultCard />
      </ExerciseProvider>)}
  </>;
}
