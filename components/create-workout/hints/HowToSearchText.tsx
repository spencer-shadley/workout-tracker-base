import { Divider, Typography } from '@mui/material';

export function HowToSearchText() {
  return (
    <article className="flex-1 flex-col h-full">
      <Typography variant="overline">
        Example searches
      </Typography>
      <br />
      <Typography variant="body2">
        Click a hint to search the example text
      </Typography>
      <Divider />
      <Typography variant="overline">
        About
      </Typography>
      <br />
      <Typography variant="body2">
        Nothing is pre-scripted. Everything is generated to your exact search!
      </Typography>
      <br />
      <Typography variant="body2">
        This means you can be highly specific. Search for exercises, workouts,
        muscle groups, physical restrictions, etc. These can even be chained
        together.
      </Typography>
      <br />
      <Typography variant="body2">
        For example, append &quot;Keep in mind I only have dumbbells&quot; to
        the end of your search to filter out exercises that require barbells.
      </Typography>
    </article>
  );
}
