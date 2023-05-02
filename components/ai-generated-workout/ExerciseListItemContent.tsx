import { Typography, Chip } from '@mui/material';
import AIExercise from '../../api/data/AIExercise';

export default function ExerciseListItemContent({
  title,
  description,
  numberOfReps,
  numberOfSets,
}: AIExercise) {
  return (
    <article>
      <span style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
        <Typography variant="h5" flexGrow={1}>
          {title}
        </Typography>
        <span
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
          }}
        >
          <Chip label={numberOfSets} />
          <Typography>Sets</Typography>
        </span>
        <span
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
          }}
        >
          <Chip label={numberOfReps} />
          <Typography>Reps</Typography>
        </span>
      </span>
      <Typography>{description}</Typography>
    </article>
  );
}
