import { GenericDialogProps, PromptDialog } from '../../../shared/PromptDialog';
import { useResultContext } from './context/ResultProvider';

export function StepsDialog(props: GenericDialogProps) {
  const { exerciseName } = useResultContext();
  return <PromptDialog {...props} prompt={`Provide an enumerated list of steps for how to do the exercise ${exerciseName}`} title={`How to do ${exerciseName}`} />;
}
