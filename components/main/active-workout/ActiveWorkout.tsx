import { useContext } from 'react';
import { WorkoutOptionsContext } from '../workout/context/WorkoutOptionsContextProvider';
import Exercises from '../workout/exercise/Exercises';

export default function ActiveWorkout() {
  const { workoutOptions } = useContext(WorkoutOptionsContext);
  return (
    <>
      {JSON.stringify(workoutOptions)}
      <Exercises />
    </>
  );
}
