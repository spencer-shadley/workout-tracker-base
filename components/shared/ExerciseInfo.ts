export default interface ExerciseInfo {
  name: string;
  description?: string;
  lastCompleted?: Date;
  numberOfTimesCompleted: number;
  maxWeight?: number;
}
