import { ExerciseProvider } from '@/components/shared/ExerciseProvider';

import { ResultListItem } from './result/ResultListItem';

export function ResultsSkeleton() {
  const skeleton = [];

  for (let i = 0; i < 10; i++) {
    skeleton.push(
      <ExerciseProvider activityType='exercise' exerciseName={null} key={i}>
        <ResultListItem />
      </ExerciseProvider>
    );
  }

  return <>
    {skeleton}
  </>;
}
