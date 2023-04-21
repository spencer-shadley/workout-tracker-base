import { Typography, TypographyProps } from '@mui/material';

interface ExerciseStatLabelProps extends TypographyProps {
  data: unknown | undefined;
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
    <Typography color="text.secondary" {...otherProps}>
      {`${beforeText} ${data} ${afterText}`.trim()}
    </Typography>
  ) : null;
}
