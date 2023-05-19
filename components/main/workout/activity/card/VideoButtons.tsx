import ReactPlayer from 'react-player/lazy';

import { useExerciseContext } from '@/components/shared/ExerciseProvider';
import { Button, Link, Skeleton, Typography } from '@mui/material';

import { useTimeContext } from '../../context/TimeContextProvider';
import useVideo from './hooks/useVideo';

export function VideoButtons() {
  const { pause } = useTimeContext();
  const { activityType } = useExerciseContext();

  const {
    videoUrl,
    setShouldShowVideo,
    hasYoutubeQuotaExceeded,
    youtubeSearchUrl,
    shouldShowVideo,
  } = useVideo();

  return activityType === `exercise` ?
    <>
      {hasYoutubeQuotaExceeded ?
        <Typography>
          YouTube Quota Exceeded
        </Typography>
        :
        <Button
          onClick={() => {
            pause();
            setShouldShowVideo(!shouldShowVideo);
          }}
        >
          {shouldShowVideo ? `hide video` : `show video`}
        </Button>
      }
      <Link href={youtubeSearchUrl} target="_blank">
        <Button onClick={() => pause()}>
          Search on YouTube
        </Button>
      </Link>
      {videoUrl && shouldShowVideo &&
        <ReactPlayer
          width="100%"
          fallback={<Skeleton variant="rectangular" />}
          url={videoUrl}
        />
      }
    </>
    : null;
}
