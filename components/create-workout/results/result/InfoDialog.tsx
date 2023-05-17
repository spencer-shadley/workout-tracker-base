import { useExerciseContext } from '../../../shared/ExerciseProvider';
import { GenericDialogProps, PromptDialog } from '../../../shared/PromptDialog';

export function InfoDialog(props: GenericDialogProps) {
  const { exerciseName } = useExerciseContext();
  return <PromptDialog {...props} prompt={`Tell me about ${exerciseName} in a few sentences.`} title={`About ${exerciseName}`} />;
}
