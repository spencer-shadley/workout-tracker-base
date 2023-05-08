import {
  Button,
  Card,
  CardContent,
  LinearProgress,
  CardProps,
  Link,
} from '@mui/material';
import { useTimeContext } from '../context/TimeContextProvider';
import { useActivityCardContext } from '../context/ActivityCardContextProvider';
import useActivityDurationInSeconds from '@/hooks/useActivityDuration';
import { ActiveExercise } from './ActiveExercise';
import { ExerciseTitle } from './ExerciseTitle';
import { ActivityCardCloseButton } from './ActivityCardCloseButton';

import youtubeSearch from 'youtube-search';

import ReactPlayer from 'react-player/lazy';
import { useEffect, useState } from 'react';

export function ActivityCard(cardProps: CardProps) {
  const { exerciseName, activityType } = useActivityCardContext();
  const { currentBucket } = useTimeContext();
  const {
    containerExercise,
    exerciseType: currentExerciseType,
    remainingTimeInMilliseconds,
  } = currentBucket;
  const isExerciseActive =
    containerExercise === exerciseName && currentExerciseType === activityType;

  const remainingTimeInSeconds = remainingTimeInMilliseconds / 1000;
  const activityDuration = useActivityDurationInSeconds(activityType);
  const progressPercent = isExerciseActive
    ? (remainingTimeInSeconds / activityDuration) * 100
    : null;

  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [showVideo, setShowVideo] = useState<boolean>(false);
  const [hasYoutubeQuotaExceeded, setHasYoutubeQuotaExceeded] =
    useState<boolean>(false);

  useEffect(() => {
    if (!showVideo || hasYoutubeQuotaExceeded) {
      return;
    }

    const opts: youtubeSearch.YouTubeSearchOptions = {
      maxResults: 1,
      key: 'AIzaSyBKLpjDurJWREpz9oQu_FWh-nwrNoKDkzA',
      type: 'video',
    };

    youtubeSearch(`how to do ${exerciseName}`, opts, (err, results) => {
      if (err) {
        setHasYoutubeQuotaExceeded(true);
        return console.log(err);
      }

      console.dir(results);
      if (results?.length) {
        setVideoUrl(results[0].link);
      }
    });
  }, [exerciseName, hasYoutubeQuotaExceeded, showVideo]);

  return (
    <Card
      sx={{
        width: '100%',
      }}
      {...cardProps}
    >
      <span style={{ display: 'flex' }}>
        <CardContent sx={{ flexGrow: 1 }}>
          <ExerciseTitle />
          <ActivityCardCloseButton />
        </CardContent>
        {isExerciseActive && (
          <ActiveExercise remainingTimeInSeconds={remainingTimeInSeconds} />
        )}
      </span>
      {progressPercent !== null && (
        <LinearProgress variant="determinate" value={progressPercent} />
      )}
      {hasYoutubeQuotaExceeded ? (
        <Link
          href={encodeURI(
            `https://www.youtube.com/results?search_query=how+to+do+${exerciseName}`
          )}
          target="_blank"
        >
          YouTube limit exceeded - click to search manually
        </Link>
      ) : activityType === 'exercise' ? (
        <Button
          onClick={() => {
            setShowVideo(true);
          }}
        >
          show video
        </Button>
      ) : null}
      {videoUrl && showVideo && <ReactPlayer url={videoUrl} />}
    </Card>
  );
}
