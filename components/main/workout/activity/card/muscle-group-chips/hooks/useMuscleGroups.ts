// TODO: remove?

// import { useEffect, useState } from 'react';

// import { useOpenAi, useOpenAiOptions } from '@/api/hooks/openai/useOpenAi';

// export default function useMuscleGroups({ prompt: exerciseName }: useOpenAiOptions) {
//   const [muscleGroups, setMuscleGroups] = useState<string[]>([]);

//   const prompt = `Provide a comma separated list of muscle groups that are relevant to the exercise ${exerciseName}. 
//   The return should be each muscle group followed by a comma, do not use "and" to separate muscle groups. 
//   Do not return more than the top 5 muscle groups. Return the muscle groups in order of relevance to the exercise. 
//   It is okay to return less than 5 muscle groups if there are fewer than 5 relevant muscle groups. 
//   This should usually be about 2-3 muscle groups, more than 3 is not common.`;
//   const result = useOpenAi({
//     prompt,
//     queryOptionOverrides: {
//       enabled: !!exerciseName,
//     },
//   });

//   const { data: muscleGroupsRaw } = result;

//   useEffect(() => {
//     if (muscleGroupsRaw) {
//       const muscleGroups = muscleGroupsRaw
//         .split(`,`)
//         .map((muscleGroup) => muscleGroup.trim());
//       setMuscleGroups(muscleGroups);
//     }
//   }, [muscleGroupsRaw]);

//   return { muscleGroups, ...result };
// }
