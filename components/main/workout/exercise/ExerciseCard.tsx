import ExerciseInfo from '@/components/shared/interfaces/ExerciseInfo';
import { Card, CardContent, IconButton, Typography } from '@mui/material';
import dayjs from 'dayjs';
import ExerciseStatLabel from './ExerciseStatLabel';
import { DragSourceMonitor, useDrag } from 'react-dnd';
import itemTypes from '@/utils/itemType';
import CloseIcon from '@mui/icons-material/Close';

interface ExerciseCardProps {
  exercise: ExerciseInfo;
  isOver: boolean;
  shouldShowCloseButton: boolean;
}

export default function ExerciseCard({
  exercise,
  isOver,
  shouldShowCloseButton,
}: ExerciseCardProps) {
  const [{ isDragging }, drag] = useDrag({
    type: itemTypes.EXERCISE_CARD,
    item: exercise,
    collect: (monitor: DragSourceMonitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <Card
      ref={drag}
      style={{ width: '100dvw', opacity: isDragging ? 0.5 : undefined }}
      sx={{
        backgroundColor: isDragging && isOver ? 'lightblue' : undefined,
      }}
    >
      <CardContent>
        <span style={{ display: 'flex', width: '100%' }}>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
            {exercise.name}
          </Typography>
          {shouldShowCloseButton && (
            <IconButton
              onClick={() => {
                console.log('clicked close button');
              }}
            >
              <CloseIcon
                style={{ alignSelf: 'center', justifySelf: 'flex-end' }}
              />
            </IconButton>
          )}
        </span>
        <ExerciseStatLabel
          data={exercise.description}
          beforeText=""
          afterText=""
        />
        <ExerciseStatLabel
          data={
            exercise.lastCompleted
              ? dayjs().to(dayjs(exercise.lastCompleted))
              : undefined
          }
          beforeText="Last completed"
          afterText=""
        />
        <ExerciseStatLabel
          data={exercise.numberOfTimesCompleted}
          beforeText="Completed"
          afterText="times"
        />
        <ExerciseStatLabel
          data={exercise.maxWeight}
          beforeText="Max weight"
          afterText="lbs"
        />
      </CardContent>
    </Card>
  );
}
