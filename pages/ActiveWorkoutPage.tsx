import ActiveWorkout from '@/components/main/active-workout/ActiveWorkout';
import { withRouter } from 'next/router';

function ActiveWorkoutPage() {
  return <ActiveWorkout />;
}

export default withRouter(ActiveWorkoutPage);
