import { ExerciseColumnTypes } from './ExerciseColumnTypes';

export default interface ExerciseInfo {
  name: string;
  description?: string;
  lastCompleted?: Date;
  numberOfTimesCompleted?: number;
  maxWeight?: number;
  currentColumn: ExerciseColumnTypes;
}
