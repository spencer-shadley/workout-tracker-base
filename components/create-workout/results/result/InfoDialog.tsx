import { GenericDialogProps, PromptDialog } from '../../../shared/PromptDialog';
import { useResultContext } from './context/ResultProvider';

export function InfoDialog(props: GenericDialogProps) {
  const { exerciseName } = useResultContext();
  return <PromptDialog {...props} prompt={`Tell me about ${exerciseName} in a few sentences.`} title={`About ${exerciseName}`} />;
}
