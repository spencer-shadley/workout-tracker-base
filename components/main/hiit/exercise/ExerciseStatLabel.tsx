import { Chip, Typography, TypographyProps } from '@mui/material';

interface ExerciseStatLabelProps extends TypographyProps {
  data: string | undefined;
  beforeText: string;
  afterText: string;
}

export default function ExerciseStatLabel({
  data,
  beforeText,
  afterText,
  ...otherProps
}: ExerciseStatLabelProps) {
  return data ? (
    // TODO: bold the data
    <span
      style={{
        whiteSpace: 'nowrap',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
      }}
    >
      {beforeText && (
        <Typography color="text.secondary" {...otherProps}>
          {beforeText}
        </Typography>
      )}

      <Chip
        label={data}
        style={{ margin: '.5em' }}
        size="small"
        sx={{ padding: 0 }}
      />

      {afterText && (
        <Typography color="text.secondary" {...otherProps}>
          {afterText}
        </Typography>
      )}
    </span>
  ) : null;
}
