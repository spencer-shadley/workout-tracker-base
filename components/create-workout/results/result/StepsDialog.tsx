import { useExerciseContext } from '../../../shared/ExerciseProvider';
import { GenericDialogProps, PromptDialog } from '../../../shared/PromptDialog';

export function StepsDialog(props: GenericDialogProps) {
  const { exerciseName } = useExerciseContext();
  return <PromptDialog {...props} prompt={`Provide an enumerated list of steps for how to do the exercise ${exerciseName}`} title={`How to do ${exerciseName}`} />;
}
