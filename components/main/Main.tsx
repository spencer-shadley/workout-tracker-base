import { Button, Typography } from '@mui/material';
import 'animate.css';
import TransparentText from '../shared/TransparentText';

// import AddWorkoutButton from '../shared/AddWorkoutButton';
// import ThemeButton from '../shared/ThemeButton';

function MainButton() {
  return (
    <Button
      variant="outlined"
      color="secondary"
      sx={{
        borderRadius: '500px',
        height: '150px',
        borderColor: 'white',
        color: 'white',
        width: '100%',
        maxWidth: '500px',
      }}
    >
      Start a workout
    </Button>
  );
}

export default function Main() {
  return (
    <main style={{ height: '100dvh', paddingTop: '50px' }}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          justifyContent: 'space-evenly',
          alignItems: 'center',
          margin: '0 50px',
        }}
      >
        <span>
          <TransparentText>Welcome back</TransparentText>
          <TransparentText shouldAnimate>Spencer</TransparentText>
        </span>

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
      {/* <ThemeButton />
      <AddWorkoutButton /> */}
    </main>
  );
}
