import { Button, Typography } from '@mui/material';
import AddWorkoutButton from '../shared/AddWorkoutButton';
import ThemeButton from '../shared/ThemeButton';

function MainButton() {
  return (
    <Button
      variant="outlined"
      color="secondary"
      sx={{
        borderRadius: '500px',
        height: '200px',
        borderColor: 'white',
        color: 'white',
      }}
    >
      Start a workout
    </Button>
  );
}

export default function Main() {
  return (
    <main style={{ height: '100%' }}>
      <Typography sx={{ color: 'white' }}>
        Welcome back Spencer. What would you like to do today?
      </Typography>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          justifyContent: 'space-evenly',
          margin: '0 50px',
        }}
      >
        <MainButton />
        <MainButton />
        <MainButton />
      </div>
      {/* <Card style={{ width: '100dvw' }}>
        <CardContent>
          <span style={{ display: 'flex', width: '100%' }}>
            <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
              {'exercise.name'}
            </Typography>
          </span>
          <ExerciseStatLabel
            data={'exercise.description'}
            beforeText=""
            afterText=""
          />

          <ExerciseStatLabel
            data={34}
            beforeText="Completed"
            afterText="times"
          />
          <ExerciseStatLabel
            data={23}
            beforeText="Max weight"
            afterText="lbs"
          />
        </CardContent>
      </Card> */}
      <ThemeButton />
      <AddWorkoutButton />
    </main>
  );
}
