import AddWorkoutButton from '../shared/AddWorkoutButton';
import ThemeButton from '../shared/ThemeButton';
import AddHIITWorkoutDialog from './hiit/dialog/HIITDialogWrapper';

export default function Main() {
  return (
    <main>
      <h1>Main</h1>
      <ThemeButton />
      <AddHIITWorkoutDialog
        isOpen={true}
        onClose={function (): void {
          console.log('Function not implemented.');
        }}
        title={'HIIT Workout'}
      />
      <AddWorkoutButton />
    </main>
  );
}
