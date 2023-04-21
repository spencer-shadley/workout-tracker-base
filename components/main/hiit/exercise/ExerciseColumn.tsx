import ExerciseInfo from '@/components/shared/ExerciseInfo';
import {
  Grid,
  Paper,
  Typography,
  Divider,
  Autocomplete,
  List,
  ListItem,
  TextField,
} from '@mui/material';
import { useRef, useState } from 'react';
import ExerciseListItem from './ExerciseListItem';
import { useDrop } from 'react-dnd';
import DraggableExerciseInfo from '@/components/shared/DraggableExerciseInfo';

interface ExerciseColumnProps {
  title: string;
  initialExercises: ExerciseInfo[];
}

export default function ExerciseColumn({
  initialExercises,
  title,
}: ExerciseColumnProps) {
  const [exercises, setExercises] = useState<ExerciseInfo[]>(initialExercises);
  const ref = useRef(null);
  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: 'exercise',
      drop: () => console.log('dropped'),
      hover: (item: DraggableExerciseInfo) => {
        console.log(item);
        if (!ref.current) {
          return;
        }
        // const dragIndex = item.index;
        // current element where the dragged element is hovered on
        // const hoverIndex = index;
        // // If the dragged element is hovered in the same place, then do nothing
        // if (dragIndex === hoverIndex) {
        //   return;
        // }
        // // If it is dragged around other elements, then move the image and set the state with position changes
        // // moveImage(dragIndex, hoverIndex);
        // /*
        //     Update the index for dragged item directly to avoid flickering
        //     when the image was half dragged into the next
        //   */
        // item.index = hoverIndex;
      },
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }),
    [exercises]
  );

  return (
    <Grid item xs={5}>
      <Paper elevation={6} sx={{ height: '100%' }}>
        <Typography variant="h3" textTransform="uppercase" textAlign="center">
          {title}
        </Typography>
        <Divider />
        <List ref={drop}>
          {[...exercises].map((exercise, index) => (
            <ExerciseListItem
              key={exercise.name}
              exercise={exercise}
              isOver={isOver}
              index={index}
            />
          ))}
          <ListItem>
            <Autocomplete
              style={{ width: '100dvw' }}
              options={exercises.map((exercise) => exercise.name)}
              renderInput={(params) => (
                <TextField {...params} label="Search exercise" />
              )}
            />
          </ListItem>
        </List>
      </Paper>
    </Grid>
  );
}
