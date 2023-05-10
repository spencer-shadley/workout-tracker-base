import { useOpenAi } from '@/hooks/openai/useOpenAi';
import { useState, useEffect } from 'react';
import { ActivityType } from '../../../context/TimeContextProvider';

export default function useMuscleGroups(
  exerciseName: string | undefined,
  activityType: ActivityType
) {
  const [muscleGroups, setMuscleGroups] = useState<string[]>([]);

  const prompt =
    activityType === 'exercise'
      ? `Provide a comma separated list of muscle groups that are relevant to the exercise ${exerciseName}. The return should be each muscle group followed by a comma, do not use "and" to separate muscle groups. Do not return more than the top 5 muscle groups. Return the muscle groups in order of relevance to the exercise. It is okay to return less than 5 muscle groups if there are fewer than 5 relevant muscle groups.`
      : '';

  const result = useOpenAi({
    prompt,
    queryOptionOverrides: {
      enabled: !!exerciseName && activityType === 'exercise',
    },
  });

  const { data: muscleGroupsRaw } = result;

  useEffect(() => {
    if (muscleGroupsRaw) {
      const muscleGroups = muscleGroupsRaw
        .split(',')
        .map((muscleGroup) => muscleGroup.trim());
      setMuscleGroups(muscleGroups);
    }
  }, [muscleGroupsRaw]);

  return { muscleGroups, ...result };
}
