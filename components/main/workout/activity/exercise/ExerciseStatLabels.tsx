import dayjs from 'dayjs';
import ExerciseStatLabel from './ExerciseStatLabel';
import ExerciseInfo from '@/components/shared/interfaces/ExerciseInfo';

interface ExerciseStatLabelsProps {
  exercise: ExerciseInfo;
}

export default function ExerciseStatLabels({
  exercise,
}: ExerciseStatLabelsProps) {
  return (
    <>
      <ExerciseStatLabel
        data={exercise.description}
        beforeText=""
        afterText=""
      />
      <ExerciseStatLabel
        data={
          exercise.lastCompleted
            ? dayjs().to(dayjs(exercise.lastCompleted))
            : undefined
        }
        beforeText="Last completed"
        afterText=""
      />
      <ExerciseStatLabel
        data={exercise.numberOfTimesCompleted}
        beforeText="Completed"
        afterText="times"
      />
      <ExerciseStatLabel
        data={exercise.maxWeight}
        beforeText="Max weight"
        afterText="lbs"
      />
    </>
  );
}
