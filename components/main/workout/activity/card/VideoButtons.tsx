import { Button, Link, Skeleton, Typography } from '@mui/material';
import { useActivityCardContext } from '../../context/ActivityCardContextProvider';
import ReactPlayer from 'react-player/lazy';
import useVideo from './hooks/useVideo';
import { useTimeContext } from '../../context/TimeContextProvider';

export function VideoButtons() {
  const { pause } = useTimeContext();
  const { activityType } = useActivityCardContext();

  const {
    videoUrl,
    setShouldShowVideo,
    hasYoutubeQuotaExceeded,
    youtubeSearchUrl,
    shouldShowVideo,
  } = useVideo();

  return activityType === 'exercise' ? (
    <>
      {hasYoutubeQuotaExceeded ? (
        <Typography>YouTube Quota Exceeded</Typography>
      ) : (
        <Button
          onClick={() => {
            pause();
            setShouldShowVideo(!shouldShowVideo);
          }}
        >
          {shouldShowVideo ? 'hide video' : 'show video'}
        </Button>
      )}

      <Link href={youtubeSearchUrl} target="_blank">
        <Button onClick={() => pause()}>Search on YouTube</Button>
      </Link>

      {videoUrl && shouldShowVideo && (
        <ReactPlayer
          width="100%"
          fallback={<Skeleton variant="rectangular" />}
          url={videoUrl}
        />
      )}
    </>
  ) : null;
}
