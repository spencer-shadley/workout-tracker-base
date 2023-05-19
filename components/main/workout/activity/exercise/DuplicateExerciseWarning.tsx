import { Snackbar, Alert } from '@mui/material';

interface DuplicateExerciseWarningProps {
  showDuplicateExerciseWarning: boolean;
  setShowDuplicateExerciseWarning: (
    showDuplicateExerciseWarning: boolean
  ) => void;
}

export default function DuplicateExerciseWarning({
  showDuplicateExerciseWarning,
  setShowDuplicateExerciseWarning,
}: DuplicateExerciseWarningProps) {
  return (
    <Snackbar
      open={showDuplicateExerciseWarning}
      autoHideDuration={1000}
      onClose={() => {
        setShowDuplicateExerciseWarning(false);
      }}
    >
      <Alert
        onClose={() => {
          setShowDuplicateExerciseWarning(false);
        }}
        severity="warning"
        sx={{ width: `100%` }}
      >
        Exercise already exists
      </Alert>
    </Snackbar>
  );
}
