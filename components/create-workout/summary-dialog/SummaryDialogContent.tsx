import {
  DialogContent,
  DialogContentText,
  List,
  Skeleton,
  Stack,
} from '@mui/material';
import { SummaryDialogContentListItem } from './SummaryDialogContentListItem';
import { useSelectedExercises } from '@/hooks/storage/useSessionStorage';
import { useSummaryDialogContext } from './context/SummaryDialogContextProvider';

export function SummaryContent() {
  const [exerciseNames] = useSelectedExercises();
  const { isLoading } = useSummaryDialogContext();

  return (
    <DialogContent>
      <List>
        {isLoading ? (
          <SummaryContentSkeleton />
        ) : (
          exerciseNames.map((exerciseName, index) => (
            <SummaryDialogContentListItem
              key={exerciseName}
              exerciseName={exerciseName}
              exerciseNumber={index + 1}
            />
          ))
        )}
      </List>
    </DialogContent>
  );
}

function SummaryContentSkeleton() {
  return (
    <Stack>
      <DialogContentText>
        Building a great workout just for you...
      </DialogContentText>
      <SummaryContentSkeletonItem />
      <SummaryContentSkeletonItem />
      <SummaryContentSkeletonItem />
    </Stack>
  );
}

function SummaryContentSkeletonItem() {
  return (
    <Stack direction="row" className="flex gap-3 ">
      <Skeleton
        variant="circular"
        width={30}
        height={30}
        sx={{
          alignSelf: 'center',
        }}
      />
      <Skeleton variant="text" sx={{ fontSize: '5rem' }} className="grow" />
    </Stack>
  );
}
